import React from "react";
import Link from "next/link";
import { Tooltip } from "@mui/material";

import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <>
      <footer className="footer-area two py-12">
        <div className="container mx-auto">
          <div className="container mx-auto sm:px-6 lg:px-8 py-5 md:py-10 bg-[#1e1f24] rounded-3xl text-white">
            <div className="grid grid-cols-8 lg:grid-cols-12"> <div className="p-4 col-span-8 flex flex-col gap-5"> <h2 className="text-2xl font-medium">联系我们</h2>
              <p className="text-[#6e7587] leading-loose  tracking-normal text-justify">Serverless Devs Registry 是 Serverless Devs 社区的衍生品，遵循 Serverless Devs Model 规范，为打造 Serverless 生态基础，繁荣 Serverless 开源生态而努力。正在为成为好用的 Serverless 领域的 NPM，Pypi ... 而努力。</p>
              <div className="flex flex-row flex-wrap gap-4">
                <Tooltip title={
                    <div className="footer-list">
                      <img
                        src="https://img.alicdn.com/imgextra/i2/O1CN019nXeTy1RfFo9CfR7i_!!6000000002138-2-tps-1264-1806.png"
                        className="w-64"
                        alt="钉钉交流群"
                      />
                    </div>
                  }>
                    <p className="bg-[#4c505d] text-white text-sm px-7 py-3 rounded-3xl gap-3 text-center text-nowrap">钉钉交流群</p>
                  </Tooltip>

                  <Tooltip title={
                    <div className="footer-list">
                        <img
                          src="https://img.alicdn.com/imgextra/i3/O1CN016kRQ1A24zePZnV87T_!!6000000007462-0-tps-528-528.jpg"
                          className="w-24"
                          alt="微信公众号"
                          style={{
                            width: '200px',
                          }}
                        />
                    </div>
                  }>
                    <p className="bg-[#4c505d] text-white text-sm px-7 py-3 rounded-3xl gap-3 text-center text-nowrap">微信公众号</p>
                  </Tooltip>
                  

                {/* <a href="" target="_blank" rel="noreferrer">
          <p className="bg-[#4c505d] text-white text-sm px-7 py-3 rounded-3xl gap-3 text-center text-nowrap">邮箱</p>
        </a>
        <a href="https://github.com/Serverless-Devs/Serverless-Devs/issues" target="_blank" rel="noreferrer">
          <p className="bg-[#4c505d] text-white text-sm px-7 py-3 rounded-3xl gap-3 text-center text-nowrap">Github</p>
        </a>
        <a href="https://gitee.com/serverless-devs/Serverless-Devs/issues" target="_blank" rel="noreferrer">
          <p className="bg-[#4c505d] text-white text-sm px-7 py-3 rounded-3xl gap-3 text-center text-nowrap">Gitee</p>
        </a> */}
              </div>
            </div>
              <div className="col-span-4  md:block sm:hidden">
                <div className="rounded-lg p-4">
                  <h2 className={"text-sm font-medium mb-4 " + styles['text-info']}>相关链接</h2>
                  <div className={"flex flex-col space-y-2 text-sm mt-10"}>


                    <ul className="footer-list space-y-2 ">
                      <li>
                        {/* 因为没有关于我们的链接 */}
                        <a
                          // href="about.html"
                          className="nav-link text-[#C7C9D1]"
                          style={{
                            color: '#C7C9D1'
                          }}
                        >
                          关于我们
                        </a>
                      </li>
                      <li>
                        <Link
                          href="https://github.com/serverless-devs/serverless-devs"
                          className="nav-link text-[#C7C9D1]"
                          style={{
                            color: '#C7C9D1'
                          }}
                        >
                          Serverless Devs 仓库
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="https://github.com/Serverless-Devs/Serverless-Devs/blob/master/spec/readme.md"
                          className="nav-link text-[#C7C9D1]"
                          style={{
                            color: '#C7C9D1'
                          }}
                        >
                          SDM 规范文档
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="https://github.com/Serverless-Devs/Serverless-Devs/discussions"
                          className="nav-link text-[#C7C9D1]"
                          style={{
                            color: '#C7C9D1'
                          }}
                        >
                          Serverless Devs 社区
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="https://github.com/Serverless-Devs/Serverless-Devs/blob/master/CONTRIBUTORS.md"
                          className="nav-link text-[#C7C9D1]"
                          style={{
                            color: '#C7C9D1'
                          }}
                        >
                          贡献者列表
                        </Link>
                      </li>
                    </ul>
                  </div>
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

export default Footer;
