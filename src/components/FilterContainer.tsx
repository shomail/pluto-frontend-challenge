import { Box, Typography } from '@mui/material';

interface FilterContainerProps {
  children: React.ReactNode;
  label?: string;
}

export default function FilterContainer({ children, label }: FilterContainerProps) {
  return (
    <Box
      sx={{
        p: 2,
        backgroundColor: '#fff',
        mt: 2,
      }}
    >
      {label && (
        <Typography variant="h6" align="left" sx={{ fontSize: '16px', mb: 1 }}>
          {label}
        </Typography>
      )}
      {children}
    </Box>
  );
}
