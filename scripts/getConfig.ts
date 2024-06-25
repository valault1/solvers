const getInputs = ({
  DEFAULT_SIDE_LENGTHS,
  DEFAULT_TARGET_SEEDS,
}: {
  DEFAULT_SIDE_LENGTHS: number[];
  DEFAULT_TARGET_SEEDS: number;
}) => {
  let inputSideLengths: number[] = DEFAULT_SIDE_LENGTHS;
  let inputNumSeeds: number = DEFAULT_TARGET_SEEDS;
  try {
    const rawInput = process.argv[2]?.split(",").map((s) => parseInt(s));
    if (rawInput?.length) inputSideLengths = rawInput;
    console.log("Using lengths: ", inputSideLengths);
  } catch (e) {
    console.log("error parsing input for side lengths");
  }
  try {
    const rawInput = parseInt(process.argv[3]);
    if (rawInput) inputNumSeeds = rawInput;
    console.log("Using target number of seeds: ", inputNumSeeds);
  } catch (e) {
    console.log("error parsing input for side lengths");
  }
  return { inputSideLengths, inputNumSeeds };
};

export const getConfig = ({
  DEFAULT_SIDE_LENGTHS,
  DEFAULT_TARGET_SEEDS,
}: {
  DEFAULT_SIDE_LENGTHS: number[];
  DEFAULT_TARGET_SEEDS: number;
}) => {
  const {
    inputSideLengths: BOARD_SIDE_LENGTHS,
    inputNumSeeds: NUM_SEEDS_TO_GENERATE_FOR_EACH_SIZE,
  } = getInputs({
    DEFAULT_SIDE_LENGTHS,
    DEFAULT_TARGET_SEEDS,
  });

  const TARGETS = BOARD_SIDE_LENGTHS.map(
    () => NUM_SEEDS_TO_GENERATE_FOR_EACH_SIZE
  );
  return {
    BOARD_SIDE_LENGTHS,
    TARGETS,
  };
};
