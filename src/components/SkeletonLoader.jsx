const SkeletonLoader = ({Class}) => {
    return (
        <div role="status" className={`${Class} min-h-[60px] flex items-center gap-2  p-1 w-full bg-gray-300 animate-pulse dark:bg-gray-700`}>
            <div className={`${Class} bg-slate-600 max-h-[50px] min-h-[50px] max-w-[50px] min-w-[50px]`}>
            </div>
            <div className="h-full w-full space-y-2">
                <div className='rounded-xl h-[20px] w-2/3 bg-slate-600 '></div>
                <div className='rounded-xl h-[20px] w-1/2 bg-slate-600'></div>
            </div>
        </div>
    );
};
export default SkeletonLoader;
