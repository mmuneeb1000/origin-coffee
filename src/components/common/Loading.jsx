const Loading = ({ text = "Loading...", fullScreen = false }) => {
  const content = (
    <div className="flex flex-col items-center justify-center gap-4 py-10">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-amber-800" />

      <p className="text-sm text-gray-500">{text}</p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        {content}
      </div>
    );
  }

  return content;
};

export default Loading;
