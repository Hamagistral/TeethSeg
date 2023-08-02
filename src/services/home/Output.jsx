import { PropTypes } from "prop-types";
const Output = ( {response} ) => {
  // let { response } = props;
  const displayModel = async (e) => {
    e.preventDefault();
    // setLoading(true);

    // const formData = new FormData();
    // formData.append("model", model);
    // formData.append("file", files);

    // communicate with API server
    // axios
    //   .post("https://api.openai.com/v1/model/", formData, {
    //     headers: {
    //       Authorization: "Bearer " + apiKey,
    //       "OpenAI-Organization": orgKey,
    //       "Content-Type": `multipart/form-data: boundary=${formData._boundary}`,
    //     },
    //   })
    //   .then((res) => {
    //     // console.log(res.data)
    //     setOutput(res.data.text);
    //     setLoading(false);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };
  return (
    <div className="w-full flex-col md:flex-row py-10 flex-box justify-evenly">
      
      <button
        type="submit"
        className="px-10 py-3.5 my-4 bg-gray-400 bg-opacity-25  text-center text-white text-base font-semibold leading-tight mx-2 rounded-lg"
        onClick={displayModel}
      >
        Display Model
      </button>
      <button
        type="submit"
        className="px-10 py-3.5 bg-gray-400 bg-opacity-25  text-center text-white text-base font-semibold leading-tight mx-2 rounded-lg"
        // onClick={predict}
      >
        {response}
      </button>
    </div>
  );
}

Output.propTypes = {
  response: PropTypes.string.isRequired,
};
export default Output;
