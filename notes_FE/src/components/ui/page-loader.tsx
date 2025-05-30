import Veritag from "@/assets/veritag.png";

export default function PageLoader() {
  console.log("welcome")
  return (
    // <AuroraBackground>
      <section className="h-screen w-full absolute left-0 top-0 flex items-center justify-center z-50">
        <div className=" transition-opacity z-50">
          <div className="animate-spin border-2 border-[rgba(0, 0, 0, 0.2)] border-l-[17.6px] border-primary w-28 h-28  md:w-40 md:h-40 rounded-full" />
          <div className="z-50 flex items-center justify-center h-full w-[50%] absolute top-0 left-[25%] translate-y-0">
            <img alt="Loader" width={80} height={80} src={Veritag} />
          </div>
        </div>
      </section>
    // </AuroraBackground>
  );
}
