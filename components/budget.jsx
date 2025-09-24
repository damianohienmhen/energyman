"use client";

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import MonetizationOnTwoToneIcon from '@mui/icons-material/MonetizationOnTwoTone';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale'
import {
  Box,
  Card,
  CardHeader,
  LinearProgress,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';
import { AvatarState } from './base/styles/avatar';

function Budget() {
  const { t } = useTranslation();
  return (
    <Card
      sx={{
        p: {
          xs: 1,
          sm: 2,
          maxWidth: 575
        },
      }}
    >
      <CardHeader
        title={t('Sales Target')}
        subheader={
          <>
            {t('You generated')} <b>50 KW</b> {t('more energy this month')}, <b>43 KW</b>{' '}
            {t('more than the previous month')}.
          </>
        }
        subheaderTypographyProps={{
          variant: 'subtitle1',
          sx: {
            pt: 1,
          },
        }}
      />
     <Box p={2}>
       
       

        <Box
          display="flex"
          alignItems="center"
          sx={{
            pt: 4,
            pb: 1,
          }}
        >
          <AvatarState
            isSoft
            state="success"
            variant="rounded"
            sx={{
              height: (theme) => theme.spacing(9),
              width: (theme) => theme.spacing(7),
            }}
          >
            <PointOfSaleIcon fontSize="large" />
          </AvatarState>
          <Box
            flex={1}
            ml={2}
          >
            <Typography
              variant="subtitle1"
              gutterBottom
              color="text.secondary"
            >
              {t('Monthly Energy Sales')}
            </Typography>
            <Box
              display="flex"
              alignItems="flex-end"
              justifyContent="space-between"
              sx={{
                my: 1,
              }}
            >
              <Typography
                variant="h4"
                color="text.primary"
                lineHeight={1}
              >
                $350
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  display: {
                    xs: 'none',
                    sm: 'block',
                  },
                }}
              >
                $500
              </Typography>
            </Box>
            <LinearProgress
              value={78}
              color="primary"
              variant="determinate"
            />
          </Box>
        </Box>
        <Typography
          variant="body1"
          color="text.secondary"
        >
          {t('Amount left to meet $500 sales target')}:{' '}
          <Typography
            variant="body2"
            component="span"
            fontWeight={700}
            color="text.primary"
          >
            $150
          </Typography>
        </Typography>

        <Box
          display="flex"
          alignItems="center"
          sx={{
            pt: 5,
            pb: 1,
          }}
        >
          <AvatarState
            isSoft
            state="error"
            variant="rounded"
            sx={{
              height: (theme) => theme.spacing(9),
              width: (theme) => theme.spacing(9),
            }}
          >
            <MonetizationOnTwoToneIcon fontSize="large" />
          </AvatarState>
          <Box
            flex={1}
            ml={2}
          >
            <Typography
              variant="subtitle1"
              gutterBottom
              color="text.secondary"
            >
              {t('Total Energy Sales')}
            </Typography>
            <Box
              display="flex"
              alignItems="flex-end"
              justifyContent="space-between"
              sx={{
                my: 1,
              }}
            >
              <Typography
                variant="h4"
                color="text.primary"
                lineHeight={1}
              >
                $2,678
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  display: {
                    xs: 'none',
                    sm: 'block',
                  },
                }}
              >
                $10,000
              </Typography>
            </Box>
            <LinearProgress
              value={49}
              color="primary"
              variant="determinate"
            />
          </Box>
        </Box>
        <Typography
          variant="body1"
          color="success.main"
        >
          {t('You are close to reaching your annual goal!!!')}
        </Typography>
      </Box>
    </Card>
  );
}
export default Budget;