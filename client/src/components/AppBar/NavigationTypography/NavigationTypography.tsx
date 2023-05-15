import { Grid, Typography, TypographyProps } from "@mui/material"
import { RoutePaths } from "../../../App"
import * as React from "react"
import { useLocation, useNavigate, useNavigation } from "react-router-dom"
import { useTheme } from "@mui/material/styles"
import { useCallback } from "react"

interface NavigationTypographyProps extends TypographyProps {
  route: RoutePaths
}

const NavigationTypography = ({
  route,
  children,
  ...other
}: NavigationTypographyProps) => {
  const navigate = useNavigate()
  const location = useLocation()
  const theme = useTheme()

  const getColor = useCallback(() => {
    return location?.pathname == route
      ? theme.palette.secondary.main
      : theme.palette.primary.main
  }, [location])

  return (
    <Typography
      variant={"h5"}
      {...other}
      color={getColor()}
      onClick={() => navigate(route)}
      sx={{cursor: "pointer"}}
    >
      {children}
    </Typography>
  )
}

export default NavigationTypography
