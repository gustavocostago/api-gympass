"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to2, from2, except, desc) => {
  if (from2 && typeof from2 === "object" || typeof from2 === "function") {
    for (let key of __getOwnPropNames(from2))
      if (!__hasOwnProp.call(to2, key) && key !== except)
        __defProp(to2, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc(from2, key)) || desc.enumerable });
  }
  return to2;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// get-distance-between-coordinates.ts
var get_distance_between_coordinates_exports = {};
__export(get_distance_between_coordinates_exports, {
  getDistanceBetweenCoordinates: () => getDistanceBetweenCoordinates
});
module.exports = __toCommonJS(get_distance_between_coordinates_exports);
function getDistanceBetweenCoordinates(from2, to2) {
  if (from2.latitude === to2.latitude && from2.longitude === to2.longitude) {
    return 0;
  }
  const fromRadian = Math.PI * from2.latitude / 180;
  const toRadian = Math.PI * to2.latitude / 180;
  const theta = from2.longitude - to2.longitude;
  const radTheta = Math.PI * theta / 180;
  let dist = Math.sin(fromRadian) * Math.sin(toRadian) + Math.cos(fromRadian) * Math.cos(toRadian) * Math.cos(radTheta);
  if (dist > 1) {
    dist = 1;
  }
  dist = Math.acos(dist);
  dist = dist * 180 / Math.PI;
  dist = dist * 60 * 1.1515;
  dist = dist * 1.609344;
  return dist;
}
var to = {
  latitude: -15.6337389,
  longitude: -55.9884282
};
var from = {
  latitude: -15.6142378,
  longitude: -56.0851705
};
var distance = getDistanceBetweenCoordinates(from, to);
console.log(distance);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getDistanceBetweenCoordinates
});
