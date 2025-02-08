"use client";
import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "@/app/components/Footer";
import { Tooltip, Table, TableBody, TableHead, TableRow } from "@mui/material";
import { PackageDetails, PackageHistoryItem, PackageDetailProps } from "./components/types";

import PackageInfoComponentSmall from "./components/PackageInfoComponentSmall";
import PackageInfoComponent from "./components/PackageInfoComponent";

import { StyledTableCell, StyledTableRow, md } from "./components/util";
import "./github-markdown-dark.css";
import './page.css';
import useMediaQuery from "./useMediaQuery";
async function fetchPackageDetail(
  packageName: string
): Promise<PackageDetails | "未找到指定资源"> {
  try {
    const res = await fetch(
      `https://api.devsapp.cn/v3/packages/${packageName}/release/latest`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch package details");
    }
    const data = await res.json();
    return data.body;
  } catch (error) {
    console.error("Error fetching package details:", error);
    return "未找到指定资源";
  }
}

const fetchOldPackageDetail = async (packageName: string) => {
  const base_url = "https://registry.devsapp.cn";
  try {
    const response = await fetch(`${base_url}/package/content`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `name=${packageName}`,
    });
    const result = await response.json();

    if (result.Error === "GetParameterFailed" || !result.Response) {
      console.error("Unable to fetch package details.");
      return "未找到指定资源";
    } else {
      return result.Response;
    }
  } catch (error) {
    console.error("Error fetching package details:", error);
  }
};

const fetchCommonData = async (packageName: string) => {
  try {
    const response = await fetch(
      `https://api.devsapp.cn/v3/packages/releases?search=${packageName}`,
      {
        headers: {
          lang: "zh",
        },
      }
    );
    const result = await response.json();
    return result.body;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

async function fetchPackageHistory(
  packageName: string
): Promise<PackageHistoryItem[]> {
  try {
    const res = await fetch(
      `https://api.devsapp.cn/v3/packages/${packageName}/release`
    );
    if (!res.ok) {
      const res2 = await fetch(
        `https://registry.devsapp.cn/simple/${packageName}/releases`
      );
      if (res2.ok) {
        const data = await res2.json();
        return data.Response;
      }
      throw new Error("Failed to fetch package history");
    }
    const data = await res.json();
    return data.body;
  } catch (error) {
    console.error("Error fetching package history:", error);
    return [];
  }
}

function formatDate(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  return new Date(dateString).toLocaleDateString("zh-CN", options);
}


// 改成grid自由流动
const PackageDetailPage: React.FC<PackageDetailProps> = ({ params }) => {
  const [packageDetail, setPackageDetail] = useState<PackageDetails | null>(null);
  const [packageHistory, setPackageHistory] = useState<PackageHistoryItem[]>([]);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [pkgInfo, setPkgInfo] = useState<any>({});
  const [isSticky, setIsSticky] = useState(false);
  
  const isSmallScreen = useMediaQuery('(max-width: 1280px)'); 

  // 监听滚动事件: 通过js代码控制左侧区域，当滚动到距离底部为400px时，图钉效果将被取消
  useEffect(() => {
    const handleScroll = () => {
      const section = document.querySelector(".breadcrumb-area");
      var hdSmall = document.querySelector('.index-main .hd-small');
      var hdLarge = document.querySelector('.index-main .hd-large');
      const scrollPosition = window.scrollY || document.documentElement.scrollTop;
      if (scrollPosition === 0) {
        // 滚动到了顶部
        console.log('Reached the top');
        hdSmall?.classList.remove('hd-small-scroll');
        hdLarge?.classList.remove('!hidden');
        setIsSticky(false);
        return;
      }


      if (section) {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const distanceFromBottom = documentHeight - (scrollPosition + windowHeight);
        if (distanceFromBottom < 400) {// 当页面滚动到距离底部400px时，图钉效果将被取消。
          hdSmall?.classList.remove('hd-small-scroll');
          hdLarge?.classList.remove('!hidden');
          setIsSticky(false);
        } else {
          const rect = section.getBoundingClientRect();
          if (rect.bottom < 0) {
            // hidden
            // block
            hdSmall?.classList.add('hd-small-scroll');
            hdLarge?.classList.add('!hidden');
            setIsSticky(true)
          }
        }
      }
    };

    const checkWidthAndAddListener = () => {
      if (window.innerWidth > 1280) {// 1280px为小屏幕的阈值
        window.addEventListener("scroll", handleScroll);
      } else {
        window.removeEventListener("scroll", handleScroll);
      }
    };

    // Initial check
    checkWidthAndAddListener();

    // Add event listener for window resize
    window.addEventListener("resize", checkWidthAndAddListener);


    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkWidthAndAddListener);
    };
  }, []);


  useEffect(() => {
    var hdSmall = document.querySelector('.index-main .hd-small');
    var hdLarge = document.querySelector('.index-main .hd-large');

    hdSmall?.classList.remove('hd-small-scroll');
    hdLarge?.classList.remove('!hidden');
    setIsSticky(false);
    
  }, [isSmallScreen]);

  // 通过优化代码，统一成使用一块代码
  // 滚动时候，改为纵向布局
  // 缩放，变为横排，自由流动

  useEffect(() => {
    async function fetchData() {
      const detail = await fetchPackageDetail(params.packageName);
      const detailOld = await fetchOldPackageDetail(params.packageName);
      if (detail === "未找到指定资源" && detailOld.Message === "未知错误") {
        setNotFound(true);
      } else if (detail !== "未找到指定资源") {
        setPackageDetail(detail);
      } else if (detailOld.Message !== "未知错误") {
        setPackageDetail(detailOld);
      }

      const history = await fetchPackageHistory(params.packageName);
      setPackageHistory(history);
      const data = await fetchCommonData(params.packageName);
      const pkg = data.find((item: any) => item.name === params.packageName);
      setPkgInfo(pkg);
    }
    fetchData();
  }, [params.packageName]);

  if (!packageDetail && !notFound) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-3xl font-bold mb-4">加载中...</h1>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-3xl font-bold mb-4">未找到指定资源</h1>
      </div>
    );
  }

  return (
    <div className="bg-black">
      <Header />
      <div className="container mx-auto sm:px-0 lg:px-0 py-0 md:py-0">
        <div className="index-main">
          <div className="hd-large">
            <PackageInfoComponent
              packageDetail={packageDetail}
              packageHistory={packageHistory}
              pkgInfo={pkgInfo}
            />
          </div>

          <div className="hd-small">
            <PackageInfoComponentSmall
              packageDetail={packageDetail}
              packageHistory={packageHistory}
              pkgInfo={pkgInfo}
            />
          </div>

          <div>
            {/* 大屏时候样式 */}
            <div
              // className={`container p-4 mx-6 w-[80%]  md:block md:w-3/4  md:!ml-auto`}
              className={` ${isSticky ? "!ml-auto !mr-10 p-4 mx-6 w-[80%] md:block md:w-[70%]" : "container mx-6"}`}

            >
              <div className="flex">
                <div className={"w-full"} style={{
                  padding: 0,
                }}>
                  <div className={`${isSticky ? "mb-4 p-4" : ""}`}>
                    <h2 className="text-white mb-6">描述</h2>
                    <p className="text-[#F4F4F6] text-opacity-70 mb-6">
                      {packageDetail?.description}
                    </p>
                  </div>
                  <div className={`${isSticky ? "mb-4 p-4" : ""}`}>
                    <h2 className="text-white mb-6">帮助文档</h2>
                    <div
                      className="markdown-body"
                      dangerouslySetInnerHTML={{
                        __html: md.render(packageDetail?.readme || "无"),
                      }}
                    ></div>
                  </div>
                  <div className={`${isSticky ? "mb-4 p-4" : "py-4"}`}>
                    <h2 className="text-white mb-6">版本记录</h2>
                    <Table className="rounded-[16px] bg-[#1E1F24]">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>版本</StyledTableCell>
                          <StyledTableCell>更新时间</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {packageHistory.map((version, index) => (
                          <StyledTableRow key={index}>
                            <StyledTableCell>
                              <Tooltip title={"下载软件包"} followCursor>
                                <div
                                  className="cursor-pointer"
                                  onClick={() =>
                                    window.open(version.zipball_url, "_blank")
                                  }
                                >
                                  {version.tag_name}
                                </div>
                              </Tooltip>
                            </StyledTableCell>
                            <StyledTableCell>
                              {formatDate(version.created_at)}
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PackageDetailPage;

