export default async function handler(req, res) {
  const startTime = new Date().getTime();
  const seeds = [];
  console.log(`time to read seeds: ${new Date().getTime() - startTime} ms`);
  res.status(200).json({ seeds });
}
