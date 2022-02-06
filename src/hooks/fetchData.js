export default async function fetchData(apiCall, updateErrors, setLoading) {
  console.log("fetch data called");
  setLoading(true);
  try {
    const response = await apiCall();
    if (response.status == 200) {
      return response.data;
    }
  } catch (error) {
    updateErrors(error);
  } finally {
    setLoading(false);
  }
}
