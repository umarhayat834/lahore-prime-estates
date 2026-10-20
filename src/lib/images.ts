/**
 * IMAGE REGISTRY — change photos here.
 *
 * Every URL below was downloaded and its contents checked by eye on 2026-10-19,
 * so the comment beside each key states what is really in the frame. Swap a
 * value for your own photography (drop the file in `public/photos/` and use
 * `/photos/your-photo.jpg`) and the whole site follows.
 */
import { lqip } from "@/lib/lqip";

/**
 * Photos live in `public/photos/` — `node scripts/fetch-images.mjs` downloads
 * whatever these two builders point at. They are local on purpose: the Next
 * image optimiser fetches the source server-side, and a hotlinked Unsplash
 * original is ~4 MB and slower than the optimiser's timeout, which shows up as
 * cards quietly falling back to the placeholder.
 */
const u = (id: string) => `/photos/${id}.jpg`;
const px = (id: string) => `/photos/pexels-${id}.jpg`;

export const img = {
  /* --- Villas with a pool ------------------------------------------- */
  villaPoolDusk: u("photo-1613490493576-7fde63acd811"), // white villa, long pool, lit at dusk
  villaPoolGarden: u("photo-1512917774080-9991f1c4c750"), // white villa, pool, planting
  villaPoolFront: u("photo-1580587771525-78b9dba3b914"), // two-storey house, pool in front
  villaPoolSculpture: u("photo-1600596542815-ffad4c1539a9"), // white villa, pool, spiral sculpture
  poolHouseSunset: u("photo-1599809275671-b5942cabc7a2"), // house with round plunge pool at sunset

  /* --- House exteriors ---------------------------------------------- */
  houseDarkDusk: u("photo-1600585154340-be6161a56a0c"), // dark modern house, lawn, large tree
  houseTimber: u("photo-1600047509807-ba8f99d2cdde"), // timber and white render house, lawn
  houseCraftsman: u("photo-1583608205776-bfd35f0d9f83"), // grey craftsman house, porch, palms
  houseBlueGarage: px("106399"), // blue two-storey house, double garage, dusk
  houseCottage: px("1029599"), // white cottage with picket fence, autumn trees
  houseBrick: u("photo-1605276374104-dee2a0ed3cd6"), // brick house, double garage, suburban street
  houseBungalow: px("210617"), // single-storey house on a wide green lawn

  /* --- Apartment and commercial buildings --------------------------- */
  apartmentBlock: u("photo-1545324418-cc1a3fa10c00"), // dark apartment block, balconies, low angle
  towersFromBelow: u("photo-1486406146926-c627a92ad1ab"), // glass towers seen from the street
  towersOverhead: u("photo-1449157291145-7efd050a4d0e"), // glass towers converging overhead
  officeFloor: u("photo-1497366811353-6870744d04b2"), // empty glazed office floor with meeting table

  /* --- City and streetscapes ---------------------------------------- */
  cityStreet: u("photo-1449824913935-59a10b8d2000"), // wide street between office towers
  skylineSunset: u("photo-1480714378408-67cf0d13bc1b"), // skyline at sunset, aerial
  skylineLake: u("photo-1477959858617-67f85cf4f1df"), // aerial skyline beside a lake at dusk
  skylineFlyovers: u("photo-1512453979798-5ea266f8880c"), // skyline with flyovers, golden hour

  /* --- Living and dining interiors ---------------------------------- */
  loungeTimberWall: u("photo-1600607687939-ce8a6c25118c"), // lounge, timber wall, open kitchen
  loungeStaircase: u("photo-1600566753086-00f18fb6b3ea"), // lounge, blue sofas, dog, staircase
  loungeFireplace: u("photo-1560448204-e02f11c3d0e2"), // bright lounge, armchairs, fireplace
  apartmentOpenPlan: u("photo-1522708323590-d24dbb6b0267"), // open-plan apartment, red chair
  loungePlants: u("photo-1502672260266-1c1ef2d93688"), // lounge, grey sofa, hanging plants
  loungeLeather: u("photo-1600210492486-724fe5c67fb0"), // lounge, leather sofa, photo wall
  loungeBar: px("276625"), // lounge with counter stools and pendant lights
  diningRoom: u("photo-1560185007-cde436f6a4d0"), // dining room, wood floor, pendant lamps

  /* --- Kitchen and bedrooms ----------------------------------------- */
  kitchenWhite: u("photo-1556911220-bff31c812dba"), // white kitchen with island and appliances
  bedroomBlue: u("photo-1522771739844-6a9f6d5f14af"), // bedroom, blue cushions, bedside lamp
  bedroomMaroon: px("164595"), // hotel-style bedroom with maroon headboard

  /* --- Land, development and paperwork ------------------------------ */
  openField: u("photo-1500382017468-9049fed747ef"), // golden field at sunset
  siteWorkers: u("photo-1541888946425-d81bb19240f5"), // construction slab with a row of workers
  blueprintReview: u("photo-1503387762-592deb58ef4e"), // hands reviewing rolled plans on a desk
  modelHouseKeys: u("photo-1560518883-ce09059eeffa"), // model house with a bunch of keys

  /* --- Portraits ---------------------------------------------------- */
  faceWomanRed: u("photo-1494790108377-be9c29b29330"), // smiling woman, red top
  faceWomanWhite: u("photo-1580489944761-15a19d654956"), // smiling woman, white blouse
  faceWomanStripe: u("photo-1544005313-94ddf0286df2"), // woman, long hair, striped shirt
  faceWomanBlazer: px("1181686"), // smiling woman, short curly hair, striped blazer
  faceWomanOutdoor: px("733872"), // woman with long auburn hair outdoors
  faceManTee: u("photo-1507003211169-0a1dd7228f2d"), // smiling man, white t-shirt
  faceManSuit: u("photo-1519085360753-af0119f7cbe7"), // man in a suit, arms crossed
  faceManGrey: px("2379005"), // bearded man, grey shirt, studio backdrop
} as const;

export type ImageKey = keyof typeof img;

/** Local placeholder shown if a remote photo ever fails to load. */
export const FALLBACK_IMAGE = "/images/property-fallback.svg";

/**
 * Base64 blur placeholder for a registry URL, or `undefined` for a photo you
 * added yourself — `SmartImage` then renders without a placeholder until the
 * image arrives. Run `node scripts/gen-lqip.mjs` to refresh the generated map.
 */
export const lqipFor = (src: string): string | undefined => lqip[src];
