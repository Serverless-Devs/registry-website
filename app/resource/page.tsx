"use client";

import React, { useEffect, useState, useLayoutEffect } from "react";
// import { useSearchParams } from "next/navigation";
import Footer from "../components/Footer";
import Header from "../components/Header";
import CardItem from "../components/card/CardItem";
import OldCardItem from "../components/card/CardItemOld";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import LoadingPopup from '../components/LoadingPopup';
import Button from "@mui/material/Button";
import { Pagination } from "@mui/material";

import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const config =
{
  "dpr": 0.5,
  "background": "6483ff",
  "palette": [
    "ffffff",
    "6218FF",
    "3400FA",
    "9968FF",
    "1A79FF"
  ],
  "offsets": [1.02, 1.5, 1.05, -0.95, -1.75, 0.27, 0.99, -1.5, 0.95, 0.54],
  "twist": [2, -0.5, 0.24, 5.7, 0.68, 0.15, 1.5, 1, 0.07, 0.04],
  "symbolColor": "#6483FF"
}

type Package = {
  name?: string;
  type?: string;
  oldType?: number;
  package?: string;
  download?: number;
  latest_create?: string;
  version?: { created_at: string };
  source?: string;
  packageName?: string;
  description?: string;
  zipball_url?: string;
};

type Category = {
  id: string;
  name: string;
};

type Provider = {
  id: string;
  name: string;
};

const ResourcePage: React.FC = () => {
  const [data, setData] = useState<Package[]>([]);
  const [sortedData, setSortedData] = useState<Package[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [selectedVersion, setSelectedVersion] = useState<string | null>('v3');
  const [selectedSort, setSelectedSort] = useState<string | null>(null);
  const [openCategories, setOpenCategories] = useState<boolean>(false);
  const [openProviders, setOpenProviders] = useState<boolean>(false);
  const [openVersion, setOpenVersion] = useState<boolean>(false);
  const [openSort, setOpenSort] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [oldData, setOldData] = useState<Package[]>([]);
  const [selectedType, setSelectedType] = useState<string>('3');
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const versions = [
    { id: 2, name: 'v2' },
    { id: 3, name: 'v3' },
  ]

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    fetchData(searchQuery, value);
  };

  // const searchParams = useSearchParams();

  const fetchOldPackages = async () => {
    try {
      const response = await fetch(
        "https://registry.devsapp.cn/package/search"
      );
      const result = await response.json();
      setOldData(result.Response);
    } catch (error) {
      console.error("Error fetching old packages:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "https://api.devsapp.cn/v3/common/categories",
        {
          headers: {
            lang: "zh",
          },
        }
      );
      const result = await response.json();
      setCategories(result.body);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchProviders = async () => {
    try {
      const response = await fetch(
        "https://api.devsapp.cn/v3/common/providers",
        {
          headers: {
            lang: "zh",
          },
        }
      );
      const result = await response.json();
      setProviders(result.body);
    } catch (error) {
      console.error("Error fetching providers:", error);
    }
  };

  const fetchTotalPages = async (search: string = "") => {
    const url = new URL(
      "https://api.devsapp.cn/v3/packages/releases"
    );
    const params: { [key: string]: string | null | number } = {
      lang: "zh",
      type: selectedType,
      category: selectedCategory,
      provider: selectedProvider,
      page: '-1',
      platform: selectedVersion && selectedVersion[1],
      search
    };
    Object.keys(params).forEach((key) => {
      if (params[key] !== null && params[key] !== "") {
        url.searchParams.append(key, params[key] as string);
      }
    });
    try {
      const response = await fetch(url.toString(), { headers: { lang: "zh" } });
      const result = await response.json();
      // 向上取整
      setTotalPages(Math.ceil(result.body.length / 20));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useLayoutEffect(() => {
    fetchCategories();
    fetchProviders();
    fetchOldPackages();
    // const bdColor = new BreathingColor({
    //   config: config,
    //   container: document.getElementById('breadcrumb-area'), // 容器元素
    //   initWidth: 100,
    //   initHeight: 100
    // });
    // bdColor.init();
    // const search = searchParams.get("search");
    // if (search) {
    //   setSearchQuery(search);
    //   fetchData(search);
    // } else {
    //   fetchData();
    // }
  }, []);
  // fetchCategories();
  // fetchProviders();
  // fetchOldPackages();

  useEffect(() => {
    fetchTotalPages(searchQuery);
    fetchData(searchQuery); // Fetch data whenever a filter changes
  }, [selectedCategory, selectedProvider, selectedType]);

  const fetchData = async (search: string = "", page = 1) => {
    setLoading(true);
    const url = new URL(
      "https://api.devsapp.cn/v3/packages/releases"
    );
    const params: { [key: string]: string | null | number } = {
      lang: "zh",
      type: selectedType,
      category: selectedCategory,
      provider: selectedProvider,
      page: page,
      platform: selectedVersion && selectedVersion[1],
      search
    };

    Object.keys(params).forEach((key) => {
      if (params[key] !== null && params[key] !== "") {
        url.searchParams.append(key, params[key] as string);
      }
    });

    try {
      const response = await fetch(url.toString(), { headers: { lang: "zh" } });
      const result = await response.json();
      setData(result.body);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const combinedData = [
      ...data.map((pkg) => ({
        ...pkg,
        source: "new",
        packageName: pkg.name,
      })),
      // ...oldData.map((pkg) => ({
      //   ...pkg,
      //   source: "old",
      //   packageName: pkg.package,
      // })),
    ];
    setSortedData(combinedData);
  }, [data, oldData]);

  const handleCategoryClick = (category: string) => {
    const newCategory = selectedCategory === category ? null : category;
    setSelectedCategory(newCategory);
  };

  const handleProviderClick = (provider: string) => {
    const newProvider = selectedProvider === provider ? null : provider;
    setSelectedProvider(newProvider);
  };

  const handleVersionClick = (version: string) => {
    const newVersion = selectedVersion === version ? null : version;
    setSelectedVersion(newVersion);
  };

  const toggleVersion = () => {
    setOpenVersion(!openVersion);
  };

  const toggleCategories = () => {
    setOpenCategories(!openCategories);
  };

  const toggleProviders = () => {
    setOpenProviders(!openProviders);
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedProvider(null);
    setSelectedType('3');
    fetchTotalPages();
    fetchData();
  };

  const handleTypeButtonClick = (type: string) => {
    let typeValue: string | null = null;
    switch (type) {
      case 'Component':
        typeValue = '1';
        break;
      case 'Plugin':
        typeValue = '2';
        break;
      case 'Project':
        typeValue = '3';
        break;
      default:
        typeValue = '3';
    }
    setSelectedType(typeValue);
  };

  return (

    <div style={{ backgroundColor: "#121316", minHeight: "100vh" }}>
      <Header sticky />
      {loading && <LoadingPopup />}

      <section
        id="breadcrumb-area"
        className="breadcrumb-area"
        style={{
          backgroundImage: "url('/image/banner.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "100px 0",
          textAlign: "center",
        }}
      >
        <div className="container">
          <div className="content text-white">
            <h1
              style={{
                fontSize: "3.0rem",
                fontWeight: "bold",
                marginBottom: "30px",
                color: "#FFFFFF",
              }}
            >
              Serverless 包管理平台
            </h1>
            <p style={{ fontSize: "1.2rem", opacity: 0.7, color: "#FFFFFF", marginBottom: "30px" }}>
              让你像使用手机一样玩转Serverless架构
            </p>

            <div className="search-container relative inline-block w-full max-w-md">
              <input
                type="text"
                placeholder="搜索 Package ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    fetchTotalPages(searchQuery);
                    fetchData(searchQuery);
                  }
                }}
                className="w-full p-3 pl-4 pr-12 border border-white rounded-md bg-opacity-25 text-white placeholder-white"
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "20px",
                  height: "45px",
                  borderColor: "#b4b6c0",
                  color: "#adb4f5",
                }}
              />
              <span className="absolute inset-y-0 right-4 flex items-center">
                <img
                  src="/image/search.svg"
                  alt="Search Icon"
                  className="w-5 h-5"
                />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Buttons Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
          marginBottom: "40px",
        }}
      >
        {/* <Button
          style={{
            margin: "0 10px",
            color: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            backgroundColor: "#252528",
            border: "1px solid #9497a1",
            borderRadius: "20px",
            padding: "8px 16px",
          }}
        >
          <div
            style={{
              background: "linear-gradient(90deg, #2227f2, #6638ff)",
              borderRadius: "20px",
              padding: "2px 8px",
              marginRight: "8px",
              color: "#FFFFFF",
              fontWeight: "bold",
            }}
          >
            HOT!
          </div>
          <img src="/image/AI_button.svg" alt="AI 工具" style={{ width: "24px", marginRight: "8px" }} />
          AI 工具
        </Button> */}
        <Button
          onClick={() => handleTypeButtonClick('Project')}
          style={{
            margin: "0 10px",
            color: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            background: selectedType === '3' ? "linear-gradient(90deg, #2528f4, #6638ff)" : "#252629",
            border: "1px solid #73757d",
            borderRadius: "20px",
            padding: "8px 16px",
          }}
        >
          <img src="/image/application_icon.svg" alt="应用" style={{ width: "24px", marginRight: "8px" }} />
          应用
        </Button>
        <Button
          onClick={() => handleTypeButtonClick('Component')}
          style={{
            margin: "0 10px",
            color: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            background: selectedType === '1' ? "linear-gradient(90deg, #2528f4, #6638ff)" : "#252629",
            border: "1px solid #73757d",
            borderRadius: "20px",
            padding: "8px 16px",
          }}
        >
          <img src="/image/comp_icon.svg" alt="组件" style={{ width: "24px", marginRight: "8px" }} />
          组件
        </Button>
        <Button
          onClick={() => handleTypeButtonClick('Plugin')}
          style={{
            margin: "0 10px",
            color: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            background: selectedType === '2' ? "linear-gradient(90deg, #2528f4, #6638ff)" : "#252629",
            border: "1px solid #73757d",
            borderRadius: "20px",
            padding: "8px 16px",
          }}
        >
          <img src="/image/plug_icon.svg" alt="插件" style={{ width: "24px", marginRight: "8px" }} />
          插件
        </Button>
      </div>

      <section
        className="main-content-section"
        style={{ backgroundColor: "transparent" }}
      >
        <div className="container mx-auto flex flex-wrap py-12" style={{
          paddingBottom: '160px'
        }}>
          <Box
            sx={{
              width: "100%",
              maxWidth: 250,
              bgcolor: "transparent",
              overflowY: "auto",
              maxHeight: 600,
              marginRight: 5,
            }}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p style={{ color: "#f2f2f5", fontSize: "20px", paddingLeft: '16px' }}>过滤器</p>
              <Button
                onClick={clearFilters}
                style={{
                  color: "#aaadb9",
                  backgroundColor: "#1b1c1e",
                  border: "1px solid #FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "5px 15px",
                  borderRadius: "20px",
                  borderColor: "#292a31",
                }}
              >
                <img
                  src="/image/cancel_icon.svg"
                  alt="Cancel Icon"
                  style={{ width: "16px", height: "16px", marginRight: "8px" }}
                />
                清除
              </Button>
            </div>

            {/* version section */}
            <ListItemButton onClick={toggleVersion}>
              <ListItemIcon>
                {openVersion ? (
                  <ExpandLess sx={{ color: "#FFFFFF" }} />
                ) : (
                  <ExpandMore sx={{ color: "#FFFFFF" }} />
                )}
              </ListItemIcon>
              <ListItemText
                primary="版本"
                primaryTypographyProps={{ style: { color: "#FFFFFF" } }}
              />
              <div
                style={{
                  width: "35px",
                  height: "25px",
                  backgroundColor: "#4f4f4f",
                  borderRadius: "20px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#FFFFFF",
                }}
              >
                {selectedVersion ? 1 : 0}
              </div>
            </ListItemButton>
            <Collapse in={openVersion} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {versions.map((version) => (
                  <ListItemButton
                    sx={{ pl: 4 }}
                    key={version.id}
                    onClick={() => handleVersionClick(version.name)}
                  >
                    <Checkbox
                      checked={selectedVersion === version.name}
                      onChange={() => handleVersionClick(version.name)}
                      sx={{
                        color: "#FFFFFF",
                        "&.Mui-checked": {
                          color: "#FFFFFF",
                        },
                      }}
                    />
                    <ListItemText
                      primary={version.name}
                      primaryTypographyProps={{ style: { color: "#FFFFFF" } }}
                    />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>

            {/* Categories Section */}
            <ListItemButton onClick={toggleCategories}
       
            >
              <ListItemIcon>
                {openCategories ? (
                  <ExpandLess sx={{ color: "#FFFFFF" }} />
                ) : (
                  <ExpandMore sx={{ color: "#FFFFFF" }} />
                )}
              </ListItemIcon>
              <ListItemText
                primary="分类"
                primaryTypographyProps={{ style: { color: "#FFFFFF" } }}
              />
              <div
                style={{
                  width: "35px",
                  height: "25px",
                  backgroundColor: "#4f4f4f",
                  borderRadius: "20px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#FFFFFF",
                }}
              >
                {selectedCategory ? 1 : 0}
              </div>
            </ListItemButton>
            <Collapse in={openCategories} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {categories.map((category) => (
                  <ListItemButton
                    sx={{ pl: 4 }}
                    key={category.id}
                    onClick={() => handleCategoryClick(category.name)}
                  >
                    <Checkbox
                      checked={selectedCategory === category.name}
                      onChange={() => handleCategoryClick(category.name)}
                      sx={{
                        color: "#FFFFFF",
                        "&.Mui-checked": {
                          color: "#FFFFFF",
                        },
                      }}
                    />
                    <ListItemText
                      primary={category.name}
                      primaryTypographyProps={{ style: { color: "#FFFFFF" } }}
                    />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>

            {/* Providers Section */}
            <ListItemButton onClick={toggleProviders}>
              <ListItemIcon>
                {openProviders ? (
                  <ExpandLess sx={{ color: "#FFFFFF" }} />
                ) : (
                  <ExpandMore sx={{ color: "#FFFFFF" }} />
                )}
              </ListItemIcon>
              <ListItemText
                primary="云厂商"
                primaryTypographyProps={{ style: { color: "#FFFFFF" } }}
              />
              <div
                style={{
                  width: "35px",
                  height: "25px",
                  backgroundColor: "#4f4f4f",
                  borderRadius: "20px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#FFFFFF",
                }}
              >
                {selectedProvider ? 1 : 0}
              </div>
            </ListItemButton>
            <Collapse in={openProviders} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {providers.map((provider) => (
                  <ListItemButton
                    sx={{ pl: 4 }}
                    key={provider.id}
                    onClick={() => handleProviderClick(provider.name)}
                  >
                    <Checkbox
                      checked={selectedProvider === provider.name}
                      onChange={() => handleProviderClick(provider.name)}
                      sx={{
                        color: "#FFFFFF",
                        "&.Mui-checked": {
                          color: "#FFFFFF",
                        },
                      }}
                    />
                    <ListItemText
                      primary={provider.name}
                      primaryTypographyProps={{ style: { color: "#FFFFFF" } }}
                    />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </Box>

          {/* Content Grid */}
          <div className="w-full md:w-7/12 lg:w-9/12">
            <div
              className="grid"
              style={{
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "30px",
              }}
            >
              {sortedData.map((item, index) =>
                item.source === "new" ? (
                  <CardItem
                    key={index}
                    item={{
                      name: item.name || "Unknown Name",
                      type: item.type || "Unknown Type",
                      download: item.download || 0,
                      latest_create: item.latest_create || "",
                      description: item.description,
                      zipball_url: item.zipball_url,
                    }}
                  />
                ) : (
                  <OldCardItem
                    key={index}
                    item={{
                      oldType: Number(item.type) || 0,
                      package: item.package || "Unknown Package",
                      download: item.download || 0,
                      version: item.version || { created_at: "" },
                      description: item.description,
                      // zipball_url: item.zipball_url,
                    }}
                  />
                )
              )}
            </div>
            <ThemeProvider theme={darkTheme}>
              <Pagination count={totalPages} size="large" page={page} onChange={handlePageChange} style={{ display: "flex", justifyContent: "center", marginTop: "78px" }} />
            </ThemeProvider>
          </div>
        </div>
      </section>
      <Footer />
    </div>


  );
};

export default ResourcePage;
