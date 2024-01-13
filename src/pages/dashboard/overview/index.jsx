function OverviewPage() {
  return (
    <>
      <div className="flex gap-5 items-center mb-2">
        <p className="font-extrabold text-white/30">Overview</p>
        <div className="font-extrabold text-white/30 text-xs rounded-full bg-cyan-900 px-2 shadow-md cursor-pointer">
          <p className="translate-y-1">o--</p>
          <p className="-translate-y-1">--o</p>
        </div>
      </div>
      <section className="grid grid-cols-12 gap-2 w-full flex-1 ">
        <div className="col-span-9 bg-cyan-900 rounded-md p-2 ">
          <p className="text-xs text-white/20 font-bold">recent transaction</p>
        </div>
        <div className="col-span-3 row-span-3 bg-cyan-600 shadow-md rounded-md p-2">
          <p className="text-xs text-black/40 font-bold">stocks</p>
        </div>
        <div className="col-span-5  bg-cyan-900 rounded-md p-2">
          <p className="text-xs text-white/20 font-bold">daily transaction</p>
        </div>
        <div className="col-span-4  bg-cyan-900 rounded-md p-2">
          <p className="text-xs text-white/20 font-bold">inbound</p>
        </div>
        <div className="col-span-4  bg-cyan-900 rounded-md p-2">
          <p className="text-xs text-white/20 font-bold">outbound</p>
        </div>
        <div className="col-span-5  bg-cyan-900 rounded-md p-2">
          <p className="text-xs text-white/20 font-bold">Export Reports</p>
        </div>
      </section>
    </>
  );
}

export default OverviewPage;
