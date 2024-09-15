import { styled } from '@mui/material/styles';
import { AppBar, Typography } from '@mui/material';

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export const StyledLogo = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
}));
