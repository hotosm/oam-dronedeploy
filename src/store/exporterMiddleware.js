/* eslint prefer-template: 0, prefer-destructuring: 0 */
import buildUrl from 'build-url';
import { EXPORT_IMAGE, EXPORT_IMAGE_SUCCEEDED, EXPORT_IMAGE_FAILED }
  from '../constants/action_types';
import { checkTokenStatus } from '../actions/authActions';
import { getToken } from '../util/authUtils';


export const getDateRange = (images) => {
  const dates = images.map((image) => {
    const dateComponents = image.date_creation.$date.split(' ');
    const dateString = dateComponents[0].replace(/:/g, '-') + ':'
    + dateComponents[1];
    const date = new Date(`${dateString} GMT`);
    return date;
  });

  const range = dates.reduce((accumulator, date) => {
    const newAccum = Object.assign({}, accumulator);
    if (accumulator.min === 0) {
      newAccum.min = date;
    }
    if (date < accumulator.min) {
      newAccum.min = date;
    }
    if (date > accumulator.max) {
      newAccum.max = date;
    }
    return newAccum;
  }, { min: 0, max: 0 });
  const isorange = { min: range.min.toISOString(), max: range.max.toISOString() };
  return isorange;
};

const buildWebHookUrl = (sensor, startDate, endDate, title, provider, tags) => {
  const api = `${process.env.CATALOG_API_URL}/dronedeploy`;
  const token = getToken();
  const webHookUrl = buildUrl(api, {
    queryParams: {
      token,
      sensor: encodeURIComponent(sensor),
      acquisition_start: encodeURIComponent(startDate),
      acquisition_end: encodeURIComponent(endDate),
      title: encodeURIComponent(title),
      provider: encodeURIComponent(provider),
      tags: encodeURIComponent(tags)
    }
  });
  return webHookUrl;
};

const exporterMiddleware = store => next => (action) => {
  if (action.type !== EXPORT_IMAGE) {
    return next(action);
  }
  const token = getToken();
  const currentTime = new Date().getTime() / 1000;
  store.dispatch(checkTokenStatus(token, currentTime));
  const dronedeployApi = store.getState().dronedeploy.dronedeployApi;

  let camera;
  let email;
  return dronedeployApi.User.get()
    .then((user) => {
      email = user.email;
      return dronedeployApi.Plans.getCurrentlyViewed();
    })
    .then((plan) => {
      camera = plan.camera.name;
      return plan.id;
    })
    .then(plan => dronedeployApi.Images.get(plan))
    .then(getDateRange)
    .then((range) => {
      const { title, provider, tags } = action.payload;
      const url =
        buildWebHookUrl(camera, range.min, range.max, title, provider, tags);
      const exportOptions = {
        layer: 'Orthomosaic',
        email: [email],
        file_format: 'geotiff',
        webhook: { url }
      };
      return dronedeployApi.Exporter.send(exportOptions);
    })
    .then(() => {
      next({
        type: EXPORT_IMAGE_SUCCEEDED
      });
    })
    .catch((error) => {
      next({
        error: error.message,
        type: EXPORT_IMAGE_FAILED
      });
    });
};

export default exporterMiddleware;
