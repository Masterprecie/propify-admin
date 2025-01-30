const Loading = () => {
  return (
    <div className="w-5 h-5 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
  );
};

const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <Loading />
      <span className="ml-2">Loading...</span>
    </div>
  );
};
export default Loader;
