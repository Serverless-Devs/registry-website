import React from "react";
import Link from "next/link";

// 外部引入的组件名称为： Footer
const FooterOld: React.FC = () => {
  return (
    <>
      <footer className="footer-area two py-12">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-between">
            <div
              className="lg:w-1/3 md:w-1/2 mb-8 wow fadeInUp"
              data-wow-delay="0.2s"
            >
              <div className="footer-box one">
                <div className="logo">
                  <h1 className="text-white">Serverless Devs Registry</h1>
                </div>
                <p className="text-gray-400 mt-4">
                  Serverless Devs Registry 是 Serverless Devs 社区的衍生品，遵循
                  Serverless Devs Model 规范，为打造 Serverless 生态基础，繁荣
                  Serverless 开源生态而努力。正在为成为好用的 Serverless 领域的
                  NPM，Pypi ... 而努力。
                </p>
                {/* <div className="social mt-4 flex space-x-4">
                  <a
                    href="https://github.com/serverless-devs/serverless-devs"
                    className="text-gray-400 hover:text-white"
                  >
                    <i className="fab fa-github"></i>
                  </a>
                  <a
                    href="https://gitee.com/serverless-devs/Serverless-Devs"
                    className="text-gray-400 hover:text-white"
                  >
                    <i className="fab fa-git"></i>
                  </a>
                  <a
                    href="https://www.serverless-devs.com"
                    className="text-gray-400 hover:text-white"
                  >
                    <i className="fab fa-page4"></i>
                  </a>
                </div> */}
              </div>
            </div>
            <div
              className="lg:w-1/6 md:w-1/2 mb-8 wow fadeInUp"
              data-wow-delay="0.3s"
            >
              <div className="footer-box two">
                <h4 className="lasthead">相关资源</h4>
                <ul className="footer-list space-y-2">
                  <li>
                    <Link
                      href="about.html"
                      className="text-gray-400 hover:text-white"
                    >
                      关于我们
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://github.com/serverless-devs/serverless-devs"
                      className="text-gray-400 hover:text-white"
                    >
                      Serverless Devs 仓库
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://github.com/Serverless-Devs/Serverless-Devs/blob/master/spec/readme.md"
                      className="text-gray-400 hover:text-white"
                    >
                      SDM 规范文档
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://github.com/Serverless-Devs/Serverless-Devs/discussions"
                      className="text-gray-400 hover:text-white"
                    >
                      Serverless Devs 社区
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://github.com/Serverless-Devs/Serverless-Devs/blob/master/CONTRIBUTORS.md"
                      className="text-gray-400 hover:text-white"
                    >
                      贡献者列表
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div
              className="lg:w-1/6 md:w-1/2 mb-8 wow fadeInUp"
              data-wow-delay="0.4s"
            >
              <div className="footer-box three">
                <h4 className="lasthead">钉钉交流群</h4>
                <div className="footer-list">
                  <img
                    src="https://img.alicdn.com/imgextra/i2/O1CN019nXeTy1RfFo9CfR7i_!!6000000002138-2-tps-1264-1806.png"
                    className="w-64"
                    alt="钉钉交流群"
                  />
                </div>
              </div>
            </div>
            <div
              className="lg:w-1/6 md:w-1/2 mb-8 wow fadeInUp"
              data-wow-delay="0.5s"
            >
              <div className="footer-box none">
                <h4 className="lasthead">微信公众号</h4>
                <div className="footer-list">
                  <img
                    src="https://img.alicdn.com/imgextra/i3/O1CN016kRQ1A24zePZnV87T_!!6000000007462-0-tps-528-528.jpg"
                    className="w-24"
                    alt="微信公众号"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="bg-gray-900 text-gray-400 py-4">
        <div className="container mx-auto text-center">
          <p className="text-sm">Copyright &copy; 2022. Serverless Devs</p>
        </div>
      </div>
    </>
  );
};

export default FooterOld;
