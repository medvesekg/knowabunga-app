import schedule from "../schedule";

function checkForDuplicates(collection, fn = (item) => item) {
  let values = {};
  for (let item of collection) {
    const value = fn(item);
    if (values[value]) {
      return value;
    }
    values[value] = true;
  }
}

test("No duplicate ids", () => {
  const duplicate = checkForDuplicates(
    Object.values(schedule).flatMap((region) =>
      region.schedule.map((item) => item.id)
    )
  );
  expect(duplicate).toBeUndefined();
});
