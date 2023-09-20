import moment from "moment/moment";

export function formatDateTime(datetime) {
  return moment(datetime).format("DD/MM/YYYY h:mm:ss A");
}
