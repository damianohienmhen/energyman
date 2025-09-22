"use client";

import { alpha, styled } from '@mui/material/styles';
import dynamic from 'next/dynamic';
import { Box } from '@mui/material';

// Dynamically load the raw editor without styling
const RawEditor = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => null,
});

// Styled wrapper component
const StyledEditor = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  boxShadow:
    theme.palette.mode === 'dark'
      ? `${alpha(theme.palette.grey[900], 0.3)} 0 1px 3px !important`
      : `${alpha(theme.palette.grey[400], 0.3)} 0 1px 3px !important`,
  backgroundColor:
    theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.background.paper,
  border:
    theme.palette.mode === 'dark'
      ? `${theme.palette.grey[800]} solid 1px !important`
      : `${theme.palette.grey[400]} solid 1px !important`,
  borderRadius: theme.shape.borderRadius,
  '& .quill': {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    overflow: 'hidden',
    borderRadius: 'inherit',
  },
  '& .ql-snow.ql-toolbar': {
    borderColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[400],
    borderLeft: 'none',
    borderRight: 'none',
    borderTop: 'none',
    '& .ql-picker-label:hover': {
      color: theme.palette.primary.main,
    },
    '& .ql-picker-label.ql-active': {
      color: theme.palette.primary.main,
    },
    '& .ql-picker-item:hover': {
      color: theme.palette.primary.main,
    },
    '& .ql-picker-item.ql-selected': {
      color: theme.palette.primary.main,
    },
    '& button': {
      height: 34,
      width: 34,
      padding: theme.spacing(0.8),
      borderRadius: theme.shape.borderRadius + 'px',
      '&:hover': {
        color: theme.palette.primary.main,
        backgroundColor: alpha(theme.palette.primary.main, 0.12),
        '& .ql-stroke': {
          stroke: theme.palette.primary.main,
        },
      },
    },
    '& button:focus': {
      color: theme.palette.primary.main,
      '& .ql-stroke': {
        stroke: theme.palette.primary.main,
      },
    },
    '& button.ql-active': {
      '& .ql-stroke': {
        stroke: theme.palette.primary.main,
      },
    },
    '& .ql-stroke': {
      stroke: theme.palette.text.primary,
    },
    '& .ql-picker': {
      color: theme.palette.text.primary,
    },
    '& .ql-picker-options': {
      backgroundColor: theme.palette.background.paper,
      border: 'none',
      borderRadius: theme.shape.borderRadius,
      boxShadow: theme.shadows[10],
      padding: theme.spacing(2),
    },
  },
  '& .ql-snow.ql-container': {
    borderBottom: 'none',
    borderColor: theme.palette.grey[400],
    borderLeft: 'none',
    borderRight: 'none',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    height: 'auto',
    overflow: 'hidden',
    '& .ql-editor': {
      color: theme.palette.text.primary,
      background:
        theme.palette.mode === 'dark'
          ? alpha(theme.palette.background.paper, 0.02)
          : theme.palette.grey[50],
      flex: 1,
      fontFamily: theme.typography.body1.fontFamily,
      fontSize: theme.typography.body1.fontSize,
      height: 'auto',
      overflowY: 'auto',
      padding: theme.spacing(2),
      borderBottomLeftRadius: theme.shape.borderRadius + 'px',
      borderBottomRightRadius: theme.shape.borderRadius + 'px',
      '&:focus': {
        background: theme.palette.background.paper,
      },
      '&.ql-blank::before': {
        color: theme.palette.text.secondary,
        fontStyle: 'normal',
        left: theme.spacing(2),
      },
    },
  },
}));

// Final export
export const QuillEditor = (props) => (
  <StyledEditor>
    <RawEditor {...props} />
  </StyledEditor>
);
