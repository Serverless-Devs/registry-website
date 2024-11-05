import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFire,
} from "@fortawesome/free-solid-svg-icons";

interface OldCardItemProps {
  item: {
    oldType: number;
    package: string;
    download?: number;
    version: {
      created_at: string;
      zipball_url?: string;
    };
    description?: string;
  };
  zipball_url?: string; // Add zipball_url as a separate prop
}


const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 285,
  position: "relative",
  display: "flex",
  flexDirection: "column",
  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
  borderRadius: "15px",
  backgroundColor: "#121316",
  border: "1px solid #4a4c56",
  transition: "background-color 0.3s, border-color 0.3s",
  '&:hover': {
    backgroundColor: "#1d1e23",
    borderColor: "#3a2580",
  },
  '&.MuiCard-root:active': {
    borderColor: "#4a4c56",
  },
}));

export default function OldCardItem({ item }: OldCardItemProps) {
  const splitMaxLength = (str: string, length: number) => {
    return str.length > length ? str.substring(0, length) + "..." : str;
  };

  const downloadPlugin = (name: string) => {
    console.log(`Downloading plugin: ${name}`);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("zh-CN", options);
  };

  const getIconSrc = () => {
    switch (item.oldType) {
      case 1:
        return "/image/card_component.svg";
      case 2:
        return "/image/card_plugin.svg";
      case 3:
        return "/image/card_application.svg";
    }
  };

  return (
    <StyledCard>
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "-20px",
          backgroundColor: "#6676fa",
          color: "white",
          width: "90px",
          height: "25px",
          transform: "rotate(45deg)",
          textAlign: "center",
          lineHeight: "25px",
          fontSize: "0.8rem",
        }}
      >
        仅维护
      </div>

      <div
        style={{
          backgroundColor: "inherit",
          padding: "20px",
          borderTopLeftRadius: "15px",
          borderTopRightRadius: "15px",
          textAlign: "left",
          display: "flex",
          alignItems: "flex-start", 
          flexDirection: "column", 
        }}
      >
        {/* Icon container */}
        <div
          style={{
            width: "45px",
            height: "45px",
            borderRadius: "10px",
            border: "1px solid #FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor:"#26272c",
            borderColor:"#5e6068",
          }}
        >
          <img
            src={getIconSrc()}
            alt={`${item.oldType} Icon`}
            style={{ width: "30px", height: "30px" }}
          />
        </div>

        {/* Download and creation date information */}
        <div style={{ marginTop: "10px", display: "flex", alignItems: "center" }}> {/* Reduced marginTop to reduce space */}
          <FontAwesomeIcon icon={faFire} style={{ color: "#4a37f0", marginRight: "5px" }} />
          <Typography
            variant="body2"
            sx={{
              fontSize: "0.9rem",
              background: "linear-gradient(90deg, #312feb, #6a42f5)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginRight: "10px",
            }}
          >
            {item.download}
          </Typography>

          <Typography
            variant="body2"
            sx={{ fontSize: "0.9rem", color: "#828596", marginRight: "10px" }}
          >
            |
          </Typography>
          <Typography variant="body2" sx={{ fontSize: "0.9rem", color: "#828596" }}>
            {formatDate(item.version.created_at)}
          </Typography>
        </div>
        <div>
           <Typography
          variant="h6"
          sx={{
            fontSize: "1.2rem",
            color: "#FFFFFF",
            fontWeight: "bold",
            marginTop: "10px", 
          }}
        >
          {splitMaxLength(item.package, 23)}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "#828596",
            fontSize: "0.7rem",
            marginTop: "10px",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 3, 
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {item.description &&
            (() => {
              try {
                const parsedDescription = JSON.parse(item.description.replace(/'/g, '"'));
                return parsedDescription.zh;
              } catch (error) {
                console.error("Failed to parse description:", error);
                return item.description; 
              }
            })()}
        </Typography>
        </div>
      </div>

      <CardContent
        sx={{
          flex: "1 0 auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          textAlign: "left",
        }}
      >
      </CardContent>

      {/* Action buttons for download and details */}
      <CardActions disableSpacing>
        <div style={{ width: "100%", textAlign: "left", marginTop:"-15px" }}>
          <div className="button flex space-x-4">
            {/* Download button */}
            <button
              onClick={() => {
                window.open(item.version.zipball_url || "", "_blank"); 
              }}
              className="download btn btn-outline-secondary"
              style={{
                backgroundColor: "#2e3037",
                color: "#c1c2c8",
                fontSize: "0.8rem",
                padding: "5px 20px",
                borderRadius: "20px",
                height: "40px",
                border:"none",
              }}
            >
              下载组件
            </button>
            {/* Details button */}
            <button
              className="preButton btn btn-outline-primary"
              style={{
                backgroundColor: "#1d1e23",
                color: "#c1c2c8",
                fontSize: "0.8rem",
                padding: "5px 20px",
                marginRight: "10px",
                borderRadius: "20px",
                borderColor: "#696b74",
              }}
              onClick={() => window.open(`/oldDetails/${item.package}`, "_blank")}
            >
              查看详情
            </button>
          </div>
        </div>
      </CardActions>
    </StyledCard>
  );
}