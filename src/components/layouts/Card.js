const Card = (props) => {
  return (
    <div className="card">
      <div className="flex items-center justify-center issue-wrap h-24 rounded dark:hover:bg-gray-500 hover:bg-gray-200 bg-gray-50 dark:bg-gray-800">
        <p className="text-md text-center underline font-serif text-gray-400 dark:text-white">
          {props.head}
        </p>

        <p className="text-xl text-center  text-gray-400 dark:text-white">
          {props.projectname}
        </p>
      </div>
    </div>
  );
};

export default Card;
