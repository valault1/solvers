// @ts-nocheck
export const boardSize = 15;
export const seeds = [
  4000, 10896, 13697, 42322, 65599, 95920, 96987, 97197, 110758, 110929, 169414,
  174557, 177168, 240635, 249743, 269569, 271422, 292563, 299176, 308523,
  318197, 330121, 359460, 401677, 449675, 451298, 452661, 479277, 510761,
  518598, 522192, 528909, 542522, 546406, 550703, 552587, 600628, 611834,
  624581, 640744, 652298, 676495, 691802, 728592, 794932, 810799, 816309,
  829186, 834305, 846554, 860479, 924657, 961365, 993314, 998562, 1000965,
  1003609, 1011470, 1027609, 1047199, 1053260, 1096772, 1106022, 1124420,
  1139489, 1166002, 1167608, 1198849, 1212650, 1212871, 1214975, 1217622,
  1232709, 1245082, 1249122, 1254232, 1265984, 1310276, 1317138, 1348922,
  1358229, 1361407, 1363759, 1366373, 1388824, 1401800, 1419777, 1423058,
  1424498, 1455942, 1461064, 1501480, 1551920, 1580455, 1631054, 1631727,
  1660748, 1660868, 1677357, 1692782, 1709255, 1715245, 1734409, 1737753,
  1739568, 1749716, 1756889, 1763088, 1790670, 1804940, 1878668, 1879787,
  1881749, 1896169, 1902224, 1915092, 1956450, 1972918, 1976244, 1988491,
  2027696, 2045143, 2045667, 2058437, 2074548, 2095747, 2114884, 2140666,
  2151052, 2151944, 2164180, 2198933, 2236551, 2246635, 2258445, 2263195,
  2277130, 2278261, 2283220, 2289796, 2326658, 2333100, 2347814, 2352603,
  2353507, 2373916, 2373950, 2374771, 2398804, 2407827, 2408390, 2415088,
  2419556, 2427879, 2435573, 2533422, 2562373, 2573241, 2588591, 2592183,
  2594706, 2606605, 2650262, 2665480, 2677340, 2720041, 2730677, 2737369,
  2744544, 2753641, 2755906, 2769519, 2781193, 2784500, 2867135, 2903108,
  2907763, 2941127, 2975936, 2984745, 2991818, 3001081, 3039053, 3044419,
  3051757, 3052390, 3057363, 3058356, 3060209, 3096580, 3144542, 3159855,
  3160635, 3167868, 3179040, 3208570, 3209586, 3214035, 3247475, 3264984,
  3293625, 3306249, 3313682, 3317329, 3323211, 3325268, 3338820, 3342944,
  3352121, 3393220, 3403972, 3404787, 3409899, 3451232, 3479291, 3488562,
  3496792, 3507933, 3523898, 3526080, 3551518, 3554031, 3577016, 3602956,
  3636162, 3639974, 3655709, 3661741, 3675101, 3696934, 3701196, 3734548,
  3750876, 3774983, 3784221, 3786920, 3822915, 3879000, 3900439, 3903428,
  3904460, 3908657, 3959515, 3969613, 3995326, 4009207, 4018595, 4038399,
  4053064, 4057077, 4067125, 4067227, 4078800, 4082060, 4086426, 4107082,
  4158504, 4183432, 4186649, 4243935, 4255918, 4263769, 4283908, 4394179,
  4416420, 4419644, 4426352, 4426581, 4437791, 4448241, 4505470, 4531633,
  4553030, 4556226, 4577145, 4588867, 4590674, 4590962, 4592483, 4617508,
  4662025, 4682243, 4697063, 4713637, 4720379, 4732383, 4733589, 4739805,
  4760957, 4794518, 4795611, 4821716, 4826519, 4826910, 4833157, 4873783,
  4891407, 4916955, 4941159, 4956449, 4975895, 4981467, 5020991, 5081369,
  5123792, 5230129, 5258596, 5275017, 5295671, 5308945, 5335985, 5347466,
  5351265, 5375916, 5391266, 5396157, 5418442, 5447565, 5460407, 5493782,
  5566435, 5583881, 5591189, 5628216, 5662069, 5664357, 5684565, 5696132,
  5770937, 5806041, 5818662, 5829139, 5856884, 5896929, 5897829, 5906061,
  5942263, 5974459, 6057807, 6078925, 6101508, 6133758, 6141861, 6146271,
  6171436, 6193437, 6210891, 6226515, 6263805, 6280870, 6336173, 6343717,
  6346267, 6364564, 6397245, 6405904, 6409491, 6410865, 6429531, 6486191,
  6590128, 6591621, 6593346, 6608936, 6630375, 6638473, 6639462, 6732677,
  6741127, 6757123, 6768844, 6772086, 6879829, 6951096, 6957816, 6970597,
  6976687, 7026481, 7032419, 7038097, 7050620, 7072849, 7122652, 7132378,
  7200678, 7202061, 7278472, 7288687, 7303390, 7332573, 7370993, 7371594,
  7375290, 7397941, 7411022, 7421004, 7455212, 7462350, 7695250, 7768568,
  7853880, 7859362, 7865987, 7872847, 7877785, 7935438, 8005817, 8011827,
  8013310, 8044887, 8065249, 8122930, 8144947, 8162733, 8183998, 8189235,
  8260910, 8296356, 8380004, 8382094, 8384706, 8435660, 8452862, 8475848,
  8532313, 8534324, 8565261, 8575657, 8600089, 8653271, 8667451, 8746403,
  8757647, 8762367, 8768733, 8779030, 8846060, 8847914, 8853790, 8918193,
  8957580, 9157717, 9266537, 9281298, 9314693, 9364385, 9411551, 9428314,
  9434866, 9469779, 9530887, 9531068, 9556095, 9576577, 9631315, 9704423,
  9705630, 9738986, 9763792, 9791390, 9792290, 9800573, 9846246, 9852068,
  9882286, 9889874, 9899294, 9902373, 9950035, 7538107,
];
export const timesTakenSeconds = [
  0.138, 0.159, 0.186, 0.445, 0.636, 0.813, 0.814, 1.066, 1.174, 1.326, 1.415,
  1.438, 1.649, 1.747, 1.931, 10.019, 10.066, 10.08, 10.186, 10.442, 10.474,
  10.748, 10.777, 10.846, 10.941, 10.959, 10.968, 10.998, 100.469, 100.749,
  100.815, 1003.685, 101.181, 101.95, 102.535, 102.576, 102.92, 102.993,
  1033.339, 104.237, 105.226, 105.41799999999999, 1053.052, 1055.182, 106.346,
  106.66300000000001, 106.987, 1063.063, 1065.561, 107.02000000000001, 107.353,
  108.83800000000001, 108.884, 109.696, 11.202, 11.204, 11.302, 11.371, 11.409,
  11.429, 110.76299999999999, 111.007, 1119.4509999999998, 1120.597, 1121.781,
  1127.862, 113.01700000000001, 113.372, 113.69, 114.96700000000001, 115.703,
  116.649, 116.734, 116.974, 117.57000000000001, 117.77799999999999, 118.654,
  1185.9370000000001, 119.151, 1191.381, 12.039, 12.176, 12.305, 12.379, 12.941,
  12.963, 120.82900000000001, 120.985, 121.001, 121.78999999999999, 122.429,
  122.61, 122.701, 122.873, 122.934, 123.39599999999999, 123.686, 123.795,
  123.82199999999999, 124.282, 125.08500000000001, 126.593, 126.922, 127.054,
  128.486, 129.409, 129.561, 13.135, 13.176, 13.375, 13.431, 13.57, 13.581,
  13.583, 13.625, 13.754, 13.784, 13.805, 13.904, 13.983, 13.998, 130.167,
  130.728, 132.017, 132.178, 132.224, 132.37900000000002, 132.636, 133.305,
  133.412, 134.284, 135.584, 136.037, 136.398, 137.59300000000002, 139.261,
  14.102, 14.247, 14.597, 14.86, 140.574, 142.702, 142.814, 142.911,
  143.74200000000002, 145.502, 146.644, 146.679, 148.36, 148.421, 149.936,
  15.079, 15.101, 15.267, 15.344, 15.398, 15.63, 15.677, 15.86, 15.913, 15.971,
  150.16100000000003, 150.969, 151.589, 151.68, 151.923, 152.31, 152.388,
  153.402, 154.852, 155.148, 155.831, 156.149, 156.93599999999998, 157.011,
  157.658, 157.859, 158.53600000000003, 159.291, 159.695, 16.147, 16.479,
  16.506, 16.513, 16.547, 16.604, 16.734, 161.37500000000003, 162.151,
  164.12199999999999, 164.43399999999997, 165.3, 167.97899999999998, 168.26,
  169.824, 169.992, 17, 17.003, 17.147, 17.465, 17.859, 172.30100000000002,
  174.334, 175.659, 176.641, 177.445, 18.183, 18.277, 18.556, 18.59, 18.659,
  18.672, 18.741, 18.879, 18.889, 180.515, 181.22299999999998, 181.608,
  181.83200000000002, 185.776, 188.82299999999998, 19.584, 19.6, 19.601, 19.643,
  19.708, 19.97, 190.021, 190.201, 192.011, 192.254, 194.24099999999999,
  196.47500000000002, 197.818, 199.271, 199.802, 2.035, 2.33, 2.355, 2.429,
  2.448, 2.522, 2.578, 2.6, 2.735, 2.859, 20.017, 20.084, 20.114, 20.16, 20.299,
  20.581, 20.75, 20.841, 200.351, 201.263, 202.422, 202.558, 202.609, 202.851,
  203.238, 203.769, 203.92, 205.07, 206.654, 21.137, 21.343, 21.562, 21.587,
  21.95, 210.157, 211.794, 212.30300000000003, 214.93800000000002, 2147.801,
  217.85399999999998, 218.752, 219.123, 22.011, 221.53900000000002,
  222.31099999999998, 223.46499999999997, 224.34300000000002,
  228.37900000000002, 228.71800000000002, 229.493, 229.684, 23.032, 23.142,
  23.177, 23.443, 23.523, 23.611, 23.809, 23.913, 230.433, 230.82, 231.065,
  234.819, 235.951, 239.716, 24.112, 24.387, 24.415, 24.568, 24.701, 24.73,
  24.984, 244.2, 245.473, 248.268, 248.51, 248.54800000000003, 249.145, 249.971,
  25.366, 25.477, 25.505, 25.577, 25.776, 256.24600000000004, 256.554,
  258.97700000000003, 259.421, 26.033, 26.061, 26.096, 26.106, 26.132, 26.262,
  26.412, 26.425, 26.66, 26.8, 26.973, 260.008, 260.841, 265.42, 27.02, 27.053,
  27.073, 27.254, 27.267, 27.387, 27.686, 273.39, 275.99199999999996, 28.113,
  28.329, 28.338, 28.511, 28.549, 28.69, 28.991, 284.359, 287.826, 288.51,
  29.152, 29.299, 29.301, 29.39, 29.476, 292.026, 298.78099999999995, 3.246,
  3.48, 3.894, 3.895, 3.966, 30.021, 30.165, 30.498, 30.785, 30.969, 302.556,
  304.837, 308.667, 31.034, 31.075, 31.103, 31.241, 31.67, 31.693, 31.921,
  310.06, 311.085, 316.19399999999996, 318.031, 319.216, 32.191, 32.347, 32.535,
  32.621, 32.804, 32.907, 325.353, 33.036, 33.296, 33.411, 33.454,
  334.49199999999996, 34.135, 34.342, 34.496, 344.78400000000005, 348.426,
  349.016, 35.016, 35.195, 35.734, 35.75, 36.163, 36.35, 36.62, 36.749, 36.751,
  36.799, 36.804, 365.947, 367.775, 37.025, 37.077, 37.356, 37.375, 38.002,
  38.027, 38.122, 38.229, 38.358, 38.521, 38.987, 382.85200000000003, 39.247,
  39.363, 39.427, 39.753, 39.877, 393.248, 399.147, 4.059, 4.139, 4.227, 4.72,
  4.805, 40.13, 40.65, 40.803, 40.853, 41.047, 41.179, 41.744, 41.893,
  411.58900000000006, 418.145, 42.13, 42.189, 42.525, 42.671, 42.933, 42.972,
  422.956, 43.003, 43.147, 43.272, 43.535, 43.547, 43.636, 43.909, 43.936,
  43.954, 44.558, 44.637, 44.702, 449.62600000000003, 45.099, 45.302, 45.343,
  45.429, 45.851, 46.018, 46.038, 46.061, 46.273, 46.377, 46.713, 46.781,
  46.798, 46.891, 46.946, 46.961, 461.333, 47.096, 47.098, 47.234, 47.591,
  47.601, 47.846, 49.298, 49.604, 49.821, 49.907, 49.943, 496.09, 5.014, 5.024,
  5.05, 5.07, 5.502, 5.528, 5.864, 50.517, 50.53, 50.65, 50.719, 50.802, 50.945,
  50.973000000000006, 51.510999999999996, 51.718, 51.859, 52.858, 52.873,
  53.223, 53.351, 53.982, 54.506, 54.946, 55.293, 55.556, 55.631, 56.096,
  56.311, 56.414, 56.537, 57.034, 57.449, 58.504, 58.611999999999995, 58.741,
  58.837, 59.289, 59.403999999999996, 59.574, 59.611, 597.4259999999999, 6.074,
  6.079, 6.204, 6.243, 6.271, 6.302, 6.366, 6.469, 6.595, 6.665, 6.796, 6.816,
  6.967, 60.195, 60.581, 60.607, 60.684999999999995, 60.807, 61.031,
  61.410000000000004, 61.593, 61.815, 61.821, 62.102, 62.126, 62.441,
  62.666000000000004, 62.869, 63.061, 63.257, 63.495, 63.702, 64.876, 64.944,
  65.138, 65.462, 66.226, 66.244, 66.64099999999999, 66.75399999999999, 67.161,
  67.204, 67.892, 671.0369999999999, 68.633, 68.656, 68.744, 69.535, 7, 7.049,
  7.097, 7.117, 7.457, 7.481, 7.94, 70.443, 70.755, 70.828, 70.99199999999999,
  703.558, 71.44800000000001, 71.78, 71.834, 71.997, 72.155, 72.202, 72.274,
  72.331, 72.571, 72.713, 72.949, 74.125, 74.559, 74.711, 75.498, 75.504,
  75.65299999999999, 75.846, 76.34700000000001, 76.559, 76.928, 77.115,
  77.76599999999999, 78.062, 78.298, 78.352, 78.383, 79.914, 79.928, 8.123,
  8.161, 8.235, 8.297, 8.321, 8.347, 8.634, 8.742, 8.879, 8.905, 8.986, 80.366,
  80.854, 81.563, 82.215, 82.362, 82.389, 82.678, 82.712, 82.936,
  83.25399999999999, 83.913, 83.919, 84.22200000000001, 84.625, 84.685,
  84.78800000000001, 85.383, 85.417, 85.548, 85.553, 85.96000000000001,
  86.10900000000001, 86.134, 86.435, 86.652, 86.674, 86.702, 86.78800000000001,
  86.94800000000001, 87.345, 87.4, 87.455, 87.97, 88.102, 88.118, 88.721,
  88.737, 88.814, 89.041, 89.05199999999999, 89.511, 89.763, 89.804, 9.044,
  9.056, 9.213, 9.573, 9.881, 9.914, 9.98, 90.037, 90.52099999999999, 90.68,
  90.93, 91.07900000000001, 91.199, 91.418, 91.979, 92.15899999999999, 92.699,
  92.767, 928.209, 93.05600000000001, 93.495, 93.839, 933.542, 94.339,
  94.60499999999999, 94.878, 95.22999999999999, 95.416, 95.485,
  95.97999999999999, 96.87, 96.999, 968.2850000000001, 97.555,
  98.08500000000001, 98.104, 98.182, 98.995, 988.7330000000001, 99.745, 99.807,
  992.774, 1687.5089999999998,
];
export const boardsGenerated = [
  10000, 10039, 10048, 10084, 1009, 10098, 10148, 10159, 1016, 10186, 102,
  10272, 1032, 10386, 10426, 10450, 10454, 10467, 10474, 10636, 10649, 1067,
  10721, 10752, 10868, 10886, 10905, 1093, 10971, 110271, 11036, 11141, 11172,
  1119, 11206, 11210, 1131, 11381, 11530, 11554, 11573, 11674, 11722, 11748,
  11752, 1176, 11810, 11860, 11875, 11895, 11899, 11923, 11924, 1195, 11961,
  11983, 120, 12004, 12021, 1206, 12101, 12104, 12236, 12247, 12249, 12373,
  1242, 12491, 12580, 12624, 12641, 1265, 1267, 12727, 12747, 12756, 12770,
  12868, 12877, 12976, 1306, 1312, 13198, 13221, 13222, 13325, 1333, 13360,
  13528, 13552, 13561, 13613, 1363, 13642, 13801, 1386, 13881, 13923, 13925,
  13935, 1397, 13981, 14001, 14039, 14068, 14123, 14138, 14207, 14270, 1433,
  1437, 1440, 14420, 14584, 14602, 14665, 14714, 14820, 14908, 14914, 15035,
  15038, 15069, 15087, 15105, 1521, 15218, 15242, 15285, 15307, 15313, 15350,
  1539, 15425, 15497, 15689, 15735, 15867, 15878, 15895, 15931, 15965, 1606,
  16111, 16139, 1616, 16163, 16191, 1623, 16285, 163, 16328, 16345, 16362, 1639,
  16427, 1645, 1646, 16468, 16473, 16489, 16574, 1672, 16760, 16789, 1679,
  16797, 16798, 16844, 16929, 16933, 1703, 171, 17191, 17227, 17311, 17391,
  17447, 17449, 17461, 17509, 17517, 17568, 17577, 17616, 1766, 17663, 17708,
  1772, 17816, 17830, 17856, 17900, 17977, 17994, 1807, 18148, 1815, 1827,
  18312, 18327, 18381, 18398, 18454, 18457, 1853, 18538, 1866, 18713, 18790,
  18823, 1884, 18974, 1905, 19062, 19137, 19164, 1930, 19358, 19590, 1962, 1966,
  1980, 19804, 19815, 19826, 1984, 19955, 20041, 20139, 2014, 20169, 20218,
  2027, 2028, 20409, 20526, 2057, 20613, 20627, 20656, 20674, 2069, 20813,
  20919, 210, 2104, 21109, 21141, 21152, 21199, 21245, 21397, 21439, 2167,
  21737, 21778, 21808, 2181, 2182, 21820, 21833, 2186, 2188, 2209, 221, 22128,
  2219, 22241, 22398, 22451, 2265, 229, 22985, 23008, 23039, 23059, 23131,
  23160, 23277, 23457, 2349, 2352, 23686, 23704, 23988, 2403, 24033, 24087,
  24107, 24176, 24197, 24226, 24354, 24737, 24745, 24858, 24901, 24928, 25025,
  2513, 2523, 25260, 25418, 25438, 2564, 25713, 25736, 25744, 25782, 25940,
  25957, 26023, 2606, 26105, 2611, 2612, 2614, 26163, 2624, 26272, 26313, 2642,
  2644, 26467, 2647, 26513, 26616, 26681, 2673, 26742, 26775, 26877, 26988,
  2699, 2730, 2732, 27326, 2752, 27582, 2766, 2767, 27793, 2789, 27954, 2801,
  28059, 28135, 28154, 28185, 2833, 2839, 28535, 28625, 28641, 288, 28951, 29,
  29021, 29037, 29137, 29339, 2951, 29530, 29674, 29690, 2984, 2989, 30013,
  3009, 30151, 3021, 3030, 30321, 30388, 30395, 30420, 30445, 30487, 3075,
  30903, 31, 31017, 31089, 31241, 3125, 31442, 31444, 31484, 31641, 31646,
  31649, 3178, 31784, 31850, 3192, 31949, 3196, 3217, 3224, 3253, 3260, 3281,
  32847, 3303, 3307, 33206, 3326, 3328, 33335, 33352, 33364, 33394, 3344, 33440,
  3345, 33561, 3371, 34, 341, 3475, 34753, 34804, 34809, 3499, 3518, 35382, 354,
  3592, 3594, 35973, 35995, 36371, 3642, 3647, 36708, 36790, 3686, 36862, 36866,
  3697, 3718, 37618, 37698, 37911, 37972, 3812, 3819, 3820, 3825, 38545, 3863,
  38693, 3877, 3884, 391, 39205, 397, 3985, 4000, 4013, 40296, 4040, 40416,
  40461, 41034, 41054, 41087, 41099, 4124, 41333, 41358, 4155, 41770, 4196,
  4197, 42217, 4240, 42604, 4262, 42701, 4282, 4297, 43162, 4323, 43512, 43657,
  4366, 439, 44285, 44292, 4435, 4449, 44517, 44613, 44652, 4468, 4495, 45323,
  4556, 457, 4587, 4621, 46211, 46354, 465, 4655, 46975, 4701, 4705, 4745, 4750,
  47740, 4789, 47962, 47998, 480, 4803, 48041, 4810, 48328, 4843, 4853, 4866,
  48702, 48876, 4890, 49114, 492, 49457, 4959, 4973, 49786, 49792, 501, 5040,
  50440, 5045, 50599, 50858, 5110, 5112, 5119, 5122, 51422, 5143, 5238, 524,
  5248, 5249, 5284, 5329, 5334, 5338, 5366, 5375, 5380, 5391, 544, 5458, 54857,
  5496, 5510, 5553, 5584, 56085, 5610, 563, 5630, 566, 5676, 57124, 57229,
  57286, 5747, 5763, 58036, 58485, 5882, 5990, 6032, 6045, 6055, 6061, 6109,
  6162, 6199, 6216, 6223, 6240, 6247, 6289, 62979, 633, 6334, 63467, 6351,
  64178, 64269, 6430, 6442, 6458, 6508, 6518, 6531, 6546, 6576, 6579, 6613,
  66317, 66340, 6692, 6698, 6708, 6717, 673, 6742, 6745, 6793, 6862, 6896, 6919,
  69378, 694, 7073, 7118, 7144, 7173, 7175, 7204, 7233, 7249, 7271, 7338, 73728,
  7433, 7459, 7473, 7494, 7694, 771, 77137, 7739, 7767, 7770, 780, 7827, 7837,
  7851, 7861, 7871, 7872, 793, 7973, 7979, 801, 8104, 815, 821, 8230, 82635,
  8299, 8323, 84325, 8444, 8463, 8469, 8475, 8489, 8521, 86, 8602, 8757, 8793,
  8809, 8831, 8895, 892, 8947, 8964, 8972, 9023, 904, 9070, 9086, 9097, 9108,
  9140, 9148, 9177, 9183, 91859, 9225, 9238, 9250, 9263, 9271, 9307, 9309, 9319,
  9347, 9370, 9388, 9395, 9418, 9469, 9514, 9618, 967, 9674, 971, 9716, 97849,
  9788, 9837, 9863, 120166,
];
export const numSeeds = 470;
export const lastSeedTried = 7598107;
export const totalTimeTaken = 83533.05499999995;
export const totalBoardsGenerated = 11333730;
export const averageTimeTakenPerSeed = 177.72990425531904;
export const averageBoardsGeneratedPerSeed = 24114.31914893617;
export const averageTimePerAttemptMs = 7.370305715770533;