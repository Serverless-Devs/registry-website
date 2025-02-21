import Link from "next/link";
import markdownit from "markdown-it";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { PackageDetails } from "./types";
import { TableRow,TableCell,} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";

export const md = markdownit({
  html: true,
  linkify: true,
  typographer: true,
  quotes: "“”‘’",
  highlight: function () {
    return "";
  },
});

export const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
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

export const tooltipContent = (packageDetail: PackageDetails | null) => {
    const markdown = `\`\`\`bash\ns init ${packageDetail?.name}\n \`\`\` `;
    return (
      <div className="m-2 text-left">
        <div className="mb-2 text-sm text-white">使用 <Link href="https://docs.serverless-devs.com/getting-started/" color="primary">S工具</Link> 下载到本地</div>
        <div
          className="markdown-body"
          dangerouslySetInnerHTML={{ __html: md.render(markdown) }}
        />
      </div>
    );
};

export const generateRandomString = (length: number) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}


export const formatDateWithHyphen = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  return new Date(dateString)
    .toLocaleDateString("zh-CN", options)
    .replace(/\//g, "-");
};



export const StyledTableCell = styled(TableCell)(({ theme }) => ({
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

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // '&:nth-of-type(odd)': {
  //   backgroundColor: theme.palette.action.hover,
  // },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

