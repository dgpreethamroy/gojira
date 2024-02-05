const Card = (props) => {
  return (
    <div className="card">
      <div className="min-h-24 rounded  dark:hover:bg-gray-500 hover:bg-gray-200 bg-gray-50 dark:bg-gray-800">
        <p className="text-xl text-center  underline text-black dark:text-white">
          {props.issuetype}
        </p>
        <p className="text-center text-black dark:text-white">
          {props.issuedescription}
        </p>
      </div>
    </div>
  );
};

export default Card;
