"use client";
import React, { useState, useEffect } from "react";
import { Button,Tooltip,ClickAwayListener } from "@mui/material";
import { HtmlTooltip, formatDateWithHyphen, tooltipContent } from "./util";

const statsContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  // padding: "20px",
  width: "100%",
  // backgroundColor: '#1a1a1a',
};

const statsItemStyle = {
  textAlign: "center",
  // margin: "10px",
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

// 外部引入的组件名称为： PackageInfoComponent
const PackageInfoComponent: React.FC<any> = ({ packageDetail, packageHistory, pkgInfo }: any) => {
  const [open, setOpen] = React.useState(false);
  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };


    return <section className="breadcrumb-area">
      <div className="container">
        <div className="content">
          <div className="md:flex justify-between items-center">
            <div className="flex items-center gap-[16px] flex-shrink-0">
              <div>
                <img
                  src="/image/application_icon.svg"
                  alt="应用"
                  style={{ width: "120px", height: "120px", color: '#959CFF', border: '0.8px solid #FFFFFF', borderRadius: '8px' }}
                />
              </div>
              {/* <div className="ml-[20px]"> */}
              <div>
                <h2 className="breadd wow fadeInUp text-[60px]">
                  {packageDetail?.name}
                </h2>
                <div className="flex items-center space-x-2 text-white">
                  {/* <FontAwesomeIcon icon={faCalendar} /> */}
                  <div style={authorIconStyle}>
                    <div style={authorFontStyle}>devs</div>
                  </div>
                  <span className="text-opacity-70 text-[#F4F4F6] text-[12px]" style={{ margin: 0 }}>
                    发布于
                    {formatDateWithHyphen(packageDetail?.created_at || packageDetail?.create || "")}
                  </span>
                </div>
              </div>
            </div>
  
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
                <div className="border-r border-[#4C505D] h-[32px] px-[10px]"></div>
                <div style={statsItemStyle as any}>
                  <div style={statsNumberStyle}>{pkgInfo?.download || packageDetail?.download}</div>
                  <div style={statsLabelStyle}>下载量</div>
                  <ClickAwayListener onClickAway={handleTooltipClose}>
                    <div>
                      <HtmlTooltip
                        title={tooltipContent(packageDetail)}
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
                <div className="border-r border-[#4C505D] h-[32px] px-[10px]"></div>
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
          </div>
        </div>
      </div>
    </section>;
  }

export default PackageInfoComponent;

