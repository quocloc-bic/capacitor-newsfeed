const ArticleDetailPageSkeleton: React.FC = () => {
  return (
    <div className="w-full">
      <div className="w-full aspect-[21/9] bg-gray-200 animate-pulse"></div>

      <div className="p-4">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>

        <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 mb-2 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
      </div>
    </div>
  );
};

export default ArticleDetailPageSkeleton;
