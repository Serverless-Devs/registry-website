"use client";
import React from "react";
import { Button, Tooltip, ClickAwayListener } from "@mui/material";
import {
  HtmlTooltip,
  formatDateWithHyphen,
  generateRandomString,
  tooltipContent,
} from "./util";
// @ts-ignore
import AESPluginEvent from "@ali/aes-tracker-plugin-event";
// @ts-ignore
import AES from "@ali/aes-tracker";

const sendEvent = new AES({
  pid: "N68f6r", // 项目 ID

  user_type: "101", // 当前登录用户所属的账号体系
  uid: "", // 当前登录用户的账号 ID
  username: "", // 当前登录用户的账号名称
}).use(AESPluginEvent);

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

// 外部引入的组件名称为： PackageInfoComponentSmall
const PackageInfoComponentSmall: React.FC<any> = ({
  packageDetail,
  packageHistory,
  pkgInfo,
}: any) => {
  const [openSmall, setOpenSmall] = React.useState(false);

  const handleTooltipSmallClose = () => {
    setOpenSmall(false);
  };

  const handleTooltipSmallOpen = () => {
    setOpenSmall(true);
  };

  return (
    <section className="breadcrumb-area" style={{ height: "100%" }}>
      <div className="container" style={{ position: "sticky", top: 0 }}>
        <div className="content" style={{ padding: "20px 0px 40px" }}>
          <div className="flex items-center flex-shrink-0">
            <div>
              <img
                src="/image/application_icon.svg"
                alt="应用"
                style={{
                  width: "100px",
                  height: "100px",
                  color: "#959CFF",
                  border: "0.8px solid #FFFFFF",
                  borderRadius: "8px",
                }}
              />
            </div>
            <div className="ml-[20px]">
              <div
                className="breadd wow fadeInUp text-[24px] text-white mb-[10px]"
                style={{ wordBreak: "break-all" }}
              >
                {packageDetail?.name}
              </div>
              <div className="flex items-center text-white">
                {/* <FontAwesomeIcon icon={faCalendar} /> */}
                <div style={authorIconStyle}>
                  <div style={authorFontStyle}>devs</div>
                </div>
                <span
                  className="text-opacity-70 text-[#F4F4F6] text-[12px]"
                  style={{ marginLeft: "8px" }}
                >
                  发布于
                  {formatDateWithHyphen(
                    packageDetail?.created_at || packageDetail?.create || ""
                  )}
                </span>
              </div>
            </div>
          </div>

          <div>
            <div className="p-0" style={statsContainerStyle}>
              <div style={statsItemStyle as any}>
                <div style={{ ...statsNumberStyle, fontSize: "24px" }}>-</div>
                <div style={{ ...statsLabelStyle, fontSize: "12px" }}>
                  工具方法
                </div>
              </div>
              {/* 分割线 */}
              <div className="border-r border-[#4C505D] h-[32px]"></div>
              <div style={statsItemStyle as any}>
                <div style={{ ...statsNumberStyle, fontSize: "24px" }}>
                  {pkgInfo?.download || packageDetail?.download}
                </div>
                <div style={{ ...statsLabelStyle, fontSize: "12px" }}>
                  下载量
                </div>
              </div>
              <div className="border-r border-[#4C505D] h-[32px]"></div>
              <div style={statsItemStyle as any}>
                <div style={{ ...statsNumberStyle, fontSize: "24px" }}>- s</div>
                <div style={{ ...statsLabelStyle, fontSize: "12px" }}>
                  部署耗时
                </div>
              </div>
            </div>
            <Tooltip
              title={
                packageDetail?.type == "Project" ||
                packageDetail?.type == "application"
                  ? "部署到阿里云函数计算"
                  : "无法部署"
              }
              followCursor
            >
              <span className="!w-full">
                <Button
                  className="!w-full"
                  style={
                    packageDetail?.type == "Project" ||
                    packageDetail?.type == "application"
                      ? deployButtonStyle
                      : deployButtonDisabledStyle
                  }
                  disabled={
                    packageDetail?.type !== "Project" &&
                    packageDetail?.type !== "application"
                  }
                  onClick={() => {
                    sendEvent('点击部署', {
                      et: "CLK",
                      c1: "deploy",
                      c2: packageDetail?.name,
                      c3: `https://fcnext.console.aliyun.com/applications/create?template=${packageDetail?.name}`
                    });
                    window.open(
                      `https://fcnext.console.aliyun.com/applications/create?template=${packageDetail?.name}`,
                      "_blank"
                    );
                  }}
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
                  placement="bottom"
                  title={tooltipContent(packageDetail)}
                  arrow
                  onClose={handleTooltipSmallClose}
                  open={openSmall}
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
                window.open(
                  packageDetail?.zipball_url || packageHistory[0].zipball_url,
                  "_blank"
                );
              }}
            >
              <span className="flex items-center justify-center">
                <img
                  className="mr-[4px]"
                  src="/image/pkg_download_icon.svg"
                  alt="下载代码包"
                />
                下载代码包
              </span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PackageInfoComponentSmall;
