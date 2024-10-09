import Image from "next/image";
import scss from "./Boost.module.scss";
import boost from "@/assets/images/Boost_image.webp";
import group from "@/assets/images/group.webp";
const Boost = () => {
  return (
    <section id={scss.Boost}>
      <div className="container">
        <div className={scss.Boost}>
          <div className={scss.Boost_text}>
            <h3>
              {" "}
              <Image src={group} alt="" />
              Clients. Team. Time. Profit.
            </h3>
            <h1>
              Boost the profits with cutting-edge digital ecosystem in one week
            </h1>
            <p>
              Altegio elevates your business efficiency with advanced online
              booking, communications, scheduling, team management, finance,
              inventory and 30+ more modules. All in a stable and reliable
              platform
            </p>
            <div className={scss.Boost_uptime}>
              <h2>
                3 min <br /> <span>Average support SLA</span>
              </h2>
              <h2>
                99.98%
                <br /> <span>Platform uptime</span>{" "}
              </h2>
            </div>
            <div className={scss.Boost_buttons}>
              <button>Start Free Trial</button>
              <h4>7 days onboarding with an expert</h4>
            </div>
          </div>
          <Image width={580} height={417} src={boost} alt="img" />
        </div>
      </div>
    </section>
  );
};

export default Boost;
