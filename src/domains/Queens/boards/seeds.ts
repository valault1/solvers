import { seeds as seeds8 } from "domains/Queens/boards/seeds8.v3";
import { seeds as seeds9 } from "domains/Queens/boards/seeds9.v2";
import { seeds as seeds10 } from "domains/Queens/boards/seeds10.v2";
import { seeds as seeds11 } from "domains/Queens/boards/seeds11.v2";
import { seeds as seeds12 } from "domains/Queens/boards/seeds12.v2";
// import { seeds as seeds13 } from "domains/Queens/boards/seeds13.v2";
// import { seeds as seeds14 } from "domains/Queens/boards/seeds14.v2";
// import { seeds as seeds15 } from "domains/Queens/boards/seeds15.v2";
// import { seeds as seeds16 } from "domains/Queens/boards/seeds16.v2";
// import { seeds as seeds17 } from "domains/Queens/boards/seeds17.v2";
// import { seeds as seeds18 } from "domains/Queens/boards/seeds18.v2";
// import { seeds as seeds19 } from "domains/Queens/boards/seeds19.v2";
// import { seeds as seeds20 } from "domains/Queens/boards/seeds20.v2";

export const SIDE_LENGTH_OPTIONS = [
  8,
  9,
  10,
  11,
  12, //13, 14, 15, 16, 17, 18, 19, 20,
];

export const getSeeds = (sideLength: number) => {
  switch (sideLength) {
    case 8:
      return seeds8;
    case 9:
      return seeds9;
    case 10:
      return seeds10;
    case 11:
      return seeds11;
    case 12:
      return seeds12;
    // case 13:
    //   return seeds13;
    // case 14:
    //   return seeds14;
    // case 15:
    //   return seeds15;
    // case 16:
    //   return seeds16;
    // case 17:
    //   return seeds17;
    // case 18:
    //   return seeds18;
    // case 19:
    //   return seeds19;
    // case 20:
    //   return seeds20;
    default:
      return [];
  }
};

export const SEEDS_10 = [
  5644424, 2681489, 3740592, 5827470, 6588786, 4504880, 7536294, 388150,
  7393962, 9923181, 5801040, 8795091, 2974529, 4933459, 8758012, 4078921,
  1164520, 6619560, 6070995, 1800123, 2810229, 4441575, 8423158, 256525,
  6287934, 8135169, 5114159, 9019536, 9991547, 3121533, 6610445, 2590832,
  1423817, 7923067, 7438042, 9407564, 5312181, 3023966, 9777243, 9828457,
  9711241, 5329275, 2504012, 5717907, 7522871, 1257185, 8286096, 2298230,
  4679585, 5140646, 9828457, 4733338, 9495562, 4238294, 6445240, 8510699,
  6469452, 8382294, 5096850, 1665538, 4121608, 1532616, 4472676, 6952144,
  5599181, 3648140, 646341, 9315353, 2398305, 6516873, 3554956, 482145, 3000859,
  3634783, 638099, 7458764, 1675721, 4274883, 3263327, 41572, 6797557, 2676672,
  3246659, 2023473, 8981076, 582739, 4078921, 769719, 1047322, 457576, 8633591,
  3165710, 9861390, 741570, 5956143, 1949292, 3680027, 7809655, 3746354,
  2335950, 4959230, 6892505, 1484283, 2415303, 8950287, 2453523, 1164520,
  5685380, 4472676, 13479, 2260283, 545859, 8873394, 4644153, 3382899, 7910775,
  1800123, 8687436, 8384042, 7788612, 3460275, 614480, 2207498, 5029799,
  3902087, 8563462, 4529818, 5884950, 5615831, 4023967, 9172926, 4529818,
  8545063, 6252585, 5105193, 4301543, 8892915, 8475253, 8212642, 4539057,
  1823604, 8783368, 7492668, 1229136, 3125617, 5219619, 5253968, 5770340,
  6322834, 4975900, 6887116, 4023967, 7751136, 8493741, 749652, 6516453, 13479,
  797285, 9087275, 2250419, 1851285, 1260481, 328671, 8622002, 4674051, 8135169,
  7712033, 2152209, 6478708, 5285907, 5448332, 3217753, 1142679, 4020457,
  7728890, 6312496, 5571755, 8616538, 4008668, 5111519, 1637516, 7275170,
  1680349, 3905721, 8698301, 4259263, 4679585, 1675721, 7920876, 2876216,
  9790107, 7869806, 6232153, 7766781, 7657853, 3013627, 5870514, 322823,
  3263327, 8222838, 5965625, 7259641, 8375299, 3587257, 3133365, 4541192, 38991,
  4816939, 2882647, 360181, 9015932, 4808167, 3004266, 8615826, 5884950,
  4493382, 4994081, 3695493, 2078655, 1247891, 7458764, 2274577, 4156003,
  5295932, 5188545, 1855667, 9495562, 7830001, 8313664, 1247891, 2901802,
  7974507, 8460084, 6311828, 437907, 1356683, 7008029, 3412985, 5304671,
  3613558, 3943554, 5549009, 1079380, 1247891, 2959009, 2959009, 103638,
  6493948, 1077977, 8862649, 2893218, 4123968, 6979008, 6832528, 7914821,
  1527920, 2055833, 6771940, 2482913, 9059893, 3466155, 9697454, 7480476,
  2610100, 7497961, 7142189, 5965625, 2033675, 8189981, 2710385, 8150015,
  4238294, 3495030, 9459090, 2391348, 3115210, 5690408, 7595451, 3466155,
  3466151, 47125, 1895296, 6992081, 6459022,
];

export const DETERMINISTIC_SEEDS = SEEDS_10;