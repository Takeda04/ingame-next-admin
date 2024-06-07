'use client'

import { Container } from "@mui/material";

import { paths } from "src/routes/paths";

import { useSettingsContext } from "src/components/settings";
import CustomBreadcrumbs from "src/components/custom-breadcrumbs";

import CatalogCreateForm from "../catalog-create-form";


export default function CatalogCreateView() {
    const settings = useSettingsContext();
  
    return (
      <Container maxWidth={settings.themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading="Katalog yaratish"
          links={[
            {
              name: "Dashboard",
              href: paths.dashboard.root,
            },
            {
              name: "Katalog",
              href: paths.dashboard.control.list,
            },
            { name: "Yangi katalog" },
          ]}
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />
        <CatalogCreateForm/>
      </Container>
    );
  }

