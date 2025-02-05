"use client";
import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "@/app/components/Footer";
import markdownit from "markdown-it";
import "./github-markdown-dark.css";
import {
  Button,
  Tooltip,
  ClickAwayListener,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Card,
  CardHeader,
  Avatar,
  CardContent,
  Link,
} from "@mui/material";
import { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";

interface PackageDetailProps {
  params: {
    packageName: string;
  };
}

interface PackageDetails {
  name: string;
  created_at: string;
  tag_name: string;
  zipball_url: string;
  description: string;
  readme: string;
  home: string;
  provider: string[];
  tags: string[];
  type: string;
  create?: string;
  download?: number;
}

interface OldPackageDetails {
  category: string;
  commands: {};
  create: string;
  description: string;
  download: number;
  flowyaml: any[];
  home: null | string;
  name: string;
  props: {};
  provider: string[];
  readme: string;
  service: {};
  syaml: string;
  tags: string[];
  type: string;
  user: string;
  userInformation: {
    user: string;
    avatar_url: string;
    html_url: string;
  };
  version: string;
  version_body: string;
}

interface PackageHistoryItem {
  tag_name: string;
  created_at: string;
  zipball_url: string;
}

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

const formatDateWithHyphen = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  return new Date(dateString)
    .toLocaleDateString("zh-CN", options)
    .replace(/\//g, "-");
};

const md = markdownit({
  html: true,
  linkify: true,
  typographer: true,
  quotes: "“”‘’",
  highlight: function () {
    return "";
  },
});

const statsContainerStyle = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  padding: "20px",
  width: "100%",
  // backgroundColor: '#1a1a1a',
};

const statsItemStyle = {
  // textAlign: 'center',
  textAlign: "center",
  margin: "10px",
};

const statsNumberStyle = {
  fontSize: "36px",
  fontWeight: "bold",
  color: "#fff",
};

const statsLabelStyle = {
  fontSize: "14px",
  color: "#ccc",
  // marginTop: '10px',
};

const deployButtonStyle = {
  background: "linear-gradient(73deg, #262CF4 10%, #7140FF 87%)",
  color: "#fff",
  border: "none",
  fontSize: "14px",
  padding: "10px 20px",
  marginTop: "10px",
  borderRadius: "24px",
  width: "156px",
  height: "48px",
  cursor: "pointer",
  opacity: 1,
};

const deployButtonDisabledStyle = {
  background: "gray",
  color: "#fff",
  border: "none",
  fontSize: "14px",
  padding: "10px 20px",
  marginTop: "10px",
  borderRadius: "24px",
  width: "156px",
  height: "48px",
  cursor: "not-allowed",
  opacity: 1,
};

const downloadButtonStyle = {
  background: "rgba(255, 255, 255, 0.1)",
  color: "#fff",
  width: "156px",
  height: "48px",
  fontSize: "14px",
  padding: "10px 20px",
  marginTop: "10px",
  borderRadius: "24px",
  cursor: "pointer",
  border: "0.8px solid #B3B6C1",
};

const codeButtonStyle = {
  // backgroundColor: '#3f51b5',
  color: "#fff",
  padding: "10px 20px",
  marginTop: "10px",
  width: "156px",
  fontSize: "14px",
  height: "48px",
  background: "rgba(255, 255, 255, 0.1)",
  borderRadius: "24px",
  cursor: "pointer",
  border: "0.8px solid #B3B6C1",
};

const authorIconStyle = {
  width: "48px",
  height: "20px",
  borderRadius: "12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  // opacity: 0.2,

  /* devs-2 */
  background: "rgb(113, 64, 255, 0.2)",
};

const authorFontStyle = {
  fontFamily: "PingFang SC",
  fontSize: "12px",
  fontWeight: 500,
  lineHeight: "16px",
  opacity: 1,
  // textAlign: 'center',
  // letterSpacing: '0px',
  color: "#7140FF",
};

const stickyDivStyle = {
  position: "fixed",
  top: "20px", // 根据需要调整
  left: "20px", // 根据需要调整
  // width: "20%",
  backgroundColor: "transparent", // 根据需要调整
  color: "white",
  // padding: "10px", // 根据需要调整
  // border: '1px solid #ccc', // 根据需要调整
  zIndex: 1000, // 注意：z-index 在 JavaScript 对象中应使用驼峰命名法 zIndex
};

const PackageDetailPage: React.FC<PackageDetailProps> = ({ params }) => {
  const [packageDetail, setPackageDetail] = useState<PackageDetails | null>(
    null
  );
  const [packageHistory, setPackageHistory] = useState<PackageHistoryItem[]>(
    []
  );
  const [notFound, setNotFound] = useState<boolean>(false);
  const [pkgInfo, setPkgInfo] = useState<any>({});
  const [open, setOpen] = React.useState(false);
  const [openSmall, setOpenSmall] = React.useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const tooltipContent = () => {
    const markdown = `\`\`\`bash\ns init ${packageDetail?.name}\n \`\`\` `;
    return (
      <div className="m-2 text-left">
        <div className="mb-2 text-sm text-white">使用 <Link href="https://docs.serverless-devs.com/getting-started/" color="primary" underline="always">S工具</Link> 下载到本地</div>
        <div
          className="markdown-body"
          dangerouslySetInnerHTML={{ __html: md.render(markdown) }}
        />
      </div>
    );
  };

  // 监听滚动事件: 通过js代码控制左侧区域，当滚动到距离底部为400px时，图钉效果将被取消
  useEffect(() => {
    const handleScroll = () => {
      const section = document.querySelector(".breadcrumb-area");
      // if (section) {
      //   const rect = section.getBoundingClientRect();
      //   setIsSticky(rect.bottom < 0);
      // }

      if (section) {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const distanceFromBottom = documentHeight - (scrollPosition + windowHeight);
        if (distanceFromBottom < 400) {// 当页面滚动到距离底部400px时，图钉效果将被取消。
          setIsSticky(false);
        } else {
          const rect = section.getBoundingClientRect();
          setIsSticky(rect.bottom < 0);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  const handleTooltipSmallClose = () => {
    setOpenSmall(false);
  };

  const handleTooltipSmallOpen = () => {
    setOpenSmall(true);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      // borderRadius: "15px",
      color: theme.palette.common.white,
      borderBottom: "1px dashed #B3B6C1",
      fontSize: 12,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 16,
      // backgroundColor: "#1E1F24",
      color: theme.palette.common.white,
      borderBottom: "1px dashed #B3B6C1",
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    // '&:nth-of-type(odd)': {
    //   backgroundColor: theme.palette.action.hover,
    // },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "black",
      color: "white",
      maxWidth: 400,
      fontSize: theme.typography.pxToRem(12),
      border: "0.5px solid #dadde9",
    },
  }));

  const packageInfoComponent = () => {
    return (
      <div>
        <div style={statsContainerStyle}>
          <div style={statsItemStyle as any}>
            <div style={statsNumberStyle}>-</div>
            <div style={statsLabelStyle}>工具方法</div>
            <Tooltip
              title={
                (packageDetail?.type == "Project" || packageDetail?.type == "application")
                  ? "部署到阿里云函数计算"
                  : "无法部署"
              }
              followCursor
            >
              <span>
                <Button
                  style={
                    (packageDetail?.type == "Project" || packageDetail?.type == "application")
                      ? deployButtonStyle
                      : deployButtonDisabledStyle
                  }
                  disabled={packageDetail?.type !== "Project" && packageDetail?.type !== "application"}
                  onClick={() =>
                    window.open(
                      `https://fcnext.console.aliyun.com/applications/create?template=${packageDetail?.name}`,
                      "_blank"
                    )
                  }
                >
                  <span className="flex items-center justify-center">
                    <img
                      className="mr-2"
                      src="/image/deploy_button_icon.svg"
                      alt="部署"
                    />
                    部署使用
                  </span>
                </Button>
              </span>
            </Tooltip>
          </div>
          {/* 分割线 */}
          <div className="border-r border-[#4C505D] h-[32px]"></div>
          <div style={statsItemStyle as any}>
            <div style={statsNumberStyle}>{pkgInfo?.download || packageDetail?.download}</div>
            <div style={statsLabelStyle}>下载量</div>
            <ClickAwayListener onClickAway={handleTooltipClose}>
              <div>
                <HtmlTooltip
                  title={tooltipContent()}
                  arrow
                  onClose={handleTooltipClose}
                  open={open}
                  disableFocusListener
                  disableHoverListener
                  disableTouchListener
                  slotProps={{
                    popper: {
                      disablePortal: true,
                    },
                  }}
                >
                  <Button
                    style={downloadButtonStyle}
                    onClick={handleTooltipOpen}
                  >
                    <span className="flex items-center justify-center">
                      <img
                        className="mr-2"
                        src="/image/console_download_icon.svg"
                        alt="指令下载"
                      />
                      指令下载
                    </span>
                  </Button>
                </HtmlTooltip>
              </div>
            </ClickAwayListener>
          </div>
          <div className="border-r border-[#4C505D] h-[32px]"></div>
          <div style={statsItemStyle as any}>
            <div style={statsNumberStyle}>- s</div>
            <div style={statsLabelStyle}>部署耗时</div>
            <Button
              style={codeButtonStyle}
              onClick={() => {
                window.open(packageDetail?.zipball_url || packageHistory[0].zipball_url, "_blank");
              }}
            >
              <span className="flex items-center justify-center">
                <img
                  className="mr-2"
                  src="/image/pkg_download_icon.svg"
                  alt="下载代码包"
                />
                下载代码包
              </span>
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const packageInfoComponentSmall = () => {
    return (
      <div>
        <div className="p-0" style={statsContainerStyle}>
          <div style={statsItemStyle as any}>
            <div style={statsNumberStyle}>-</div>
            <div style={statsLabelStyle}>工具方法</div>
          </div>
          {/* 分割线 */}
          <div className="border-r border-[#4C505D] h-[32px]"></div>
          <div style={statsItemStyle as any}>
            <div style={statsNumberStyle}>{pkgInfo?.download || packageDetail?.download}</div>
            <div style={statsLabelStyle}>下载量</div>
          </div>
          <div className="border-r border-[#4C505D] h-[32px]"></div>
          <div style={statsItemStyle as any}>
            <div style={statsNumberStyle}>- s</div>
            <div style={statsLabelStyle}>部署耗时</div>
          </div>
        </div>
        <Tooltip
          title={
            (packageDetail?.type == "Project" || packageDetail?.type == "application")
              ? "部署到阿里云函数计算"
              : "无法部署"
          }
          followCursor
        >
          <span className="!w-full">
            <Button
              className="!w-full"
              style={
                (packageDetail?.type == "Project" || packageDetail?.type == "application")
                  ? deployButtonStyle
                  : deployButtonDisabledStyle
              }
              disabled={packageDetail?.type !== "Project" && packageDetail?.type !== "application"}
              onClick={() =>
                window.open(
                  `https://fcnext.console.aliyun.com/applications/create?template=${packageDetail?.name}`,
                  "_blank"
                )
              }
            >
              <span className="flex items-center justify-center">
                <img
                  className="mr-2"
                  src="/image/deploy_button_icon.svg"
                  alt="部署"
                />
                部署使用
              </span>
            </Button>
          </span>
        </Tooltip>
        <ClickAwayListener onClickAway={handleTooltipSmallClose}>
          <div className="!w-full">
            <HtmlTooltip
              className="z-999"
              title={tooltipContent()}
              arrow
              onClose={handleTooltipSmallClose}
              open={openSmall}
              disableFocusListener
              disableHoverListener
              disableTouchListener
              placement="right"
              slotProps={{
                popper: {
                  disablePortal: true,
                },
              }}
            >
              <Button
                style={downloadButtonStyle}
                onClick={handleTooltipSmallOpen}
                className="!w-full"
              >
                <span className="flex items-center justify-center">
                  <img
                    className="mr-2"
                    src="/image/console_download_icon.svg"
                    alt="指令下载"
                  />
                  指令下载
                </span>
              </Button>
            </HtmlTooltip>
          </div>
        </ClickAwayListener>
        <Button
          className="!w-full"
          style={codeButtonStyle}
          onClick={() => {
            window.open(packageDetail?.zipball_url || packageHistory[0].zipball_url, "_blank");
          }}
        >
          <span className="flex items-center justify-center">
            <img
              className="mr-2"
              src="/image/pkg_download_icon.svg"
              alt="下载代码包"
            />
            下载代码包
          </span>
        </Button>
      </div>
    );
  };

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
      {/* Left: 左侧浮动内容 */}
      <section className="breadcrumb-area">
        <div className="container">
          <div className="content">
            {/* <div className="flex justify-evenly items-center"> */}
            <div className="md:flex justify-between items-center">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: '16px'
                }}
              >
                <div>
                  <img
                    src="/image/application_icon.svg"
                    alt="应用"
                    style={{ width: "120px", height: "120px", color: '#959CFF' , border: '0.8px solid #FFFFFF', borderRadius: '8px'}}
                  />
                </div>
                <div className="ml-[20px]">
                  <h2 className="breadd wow fadeInUp text-[60px]">
                    {packageDetail?.name}
                  </h2>
                  <div className="flex items-center space-x-2 text-white">
                    {/* <FontAwesomeIcon icon={faCalendar} /> */}
                    <div style={authorIconStyle}>
                      <div style={authorFontStyle}>devs</div>
                    </div>
                    <span className=" text-opacity-70 text-[#F4F4F6] text-[12px]" style={{margin: 0}}>
                      发布于
                      {formatDateWithHyphen(packageDetail?.created_at || packageDetail?.create || "")}
                    </span>
                  </div>
                </div>
              </div>
              {packageInfoComponent()}
            </div>
          </div>
        </div>
      </section>
      {/* Right: 右侧主体内容 */}
      {isSticky && (
        <Card style={stickyDivStyle as any} className="card-sticky md:block sm:hidden ">
          <CardHeader
            title={<span className="text-[24px]">{packageDetail?.name}</span>}
            avatar={
              <Avatar
                sx={{ width: "100px", height: "100px" }}
                variant="rounded"
                src={"/image/application_icon.svg"}
              />
            }
            subheader={
              <div>
                <div className="flex items-center space-x-2 text-white">
                  {/* <FontAwesomeIcon icon={faCalendar} /> */}
                  <div style={authorIconStyle}>
                    <div style={authorFontStyle}>devs</div>
                  </div>
                  <span className="text-opacity-70 text-[#F4F4F6]">
                    发布于 {formatDateWithHyphen(packageDetail?.created_at || packageDetail?.create || "")}
                  </span>
                </div>
                {/* <div className="flex items-center space-x-2 text-opacity-70 text-[#F4F4F6]">
                  <span>免责声明</span>
                  <span>隐私声明</span>
                </div> */}
              </div>
            }
          />
          <CardContent>
            {packageInfoComponentSmall()}
          </CardContent>
        </Card>
      )}



      <div
        className={` ${
          isSticky ? "!ml-auto !mr-10 p-4 mx-6 " : "container  p-4 mx-6"
        } w-[80%] hidden md:block md:w-3/4  md:!ml-auto sm:hidden
        `}
      >
        <div className="flex">
          {/* <div className="p-4 ml-10 w-full"> */}
          <div className={`${isSticky ? "w-full flex-1 md:ml-[140px]" : "w-full"}`} style={{
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
              {/* <p className="text-[#F4F4F6] text-opacity-70 mb-6">{}</p> */}
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
                    // <li key={index} className="list-group-item">
                    //   V{version.tag_name} ({formatDate(version.created_at)})
                    // </li>
                  ))}
                </TableBody>
              </Table>
            </div>
            {/* <div className="card p-4">
              <ReadmeSection
                readme={packageDetail?.readme || "无"}
                home={packageDetail?.home || ""}
              />
            </div> */}
          </div>
          {/* <div className="w-5/12 p-4">
            <div className="card mb-4 p-4">
              <p className="card-text">
                厂商支持：{packageDetail?.provider.join(", ")}
              </p>
            </div>
            <div className="card mb-4 p-4">
              <p className="card-text">更新时间: {packageDetail?.created_at}</p>
              <p className="card-text">更新版本: {packageDetail?.tag_name}</p>
            </div>
            <div className="card mb-4 p-4">
              <h2 className="card-title text-xl font-bold mb-2">历史版本</h2>
              <ul className="list-group">
                {packageHistory.map((version, index) => (
                  <li key={index} className="list-group-item">
                    V{version.tag_name} ({formatDate(version.created_at)})
                  </li>
                ))}
              </ul>
            </div>
            <div className="card p-4">
              <h2 className="card-title text-xl font-bold mb-2">标签</h2>
              <p className="card-text">{packageDetail?.tags.join(", ")}</p>
            </div>
          </div> */}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PackageDetailPage;

