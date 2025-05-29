import { useState } from "react";
import type { IProduct } from "../../model/Product.ts";
import { Comments } from "../Comments/Comments.tsx";
import { useAppDispatch } from "../../hooks/redux.ts";
import { deleteProduct } from "../../store/products/productsThunks.ts";
import Modal from "../Modal/Modal.tsx";
import { Form } from "../Form/Form.tsx";
import { setCurrentProduct } from "../../store/products/productsSlice.ts";
import { Link as RouterLink } from "react-router-dom";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Box,
  Chip,
  Divider,
  Collapse,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

interface IExpandMoreProps {
  expand: boolean;
  onClick: () => void;
  "aria-expanded": boolean;
  "aria-label": string;
}

function ExpandMore({ expand, ...other }: IExpandMoreProps) {
  return (
    <IconButton
      sx={{
        transform: expand ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 0.2s",
      }}
      {...other}
    >
      <ExpandMoreIcon />
    </IconButton>
  );
}

export function Product({ id, count, name, size, weight, imageUrl, comments }: IProduct) {
  const dispatch = useAppDispatch();
  const [commentsShown, setCommentsShown] = useState(false);
  const [editModalShown, setEditModalShown] = useState(false);
  const [removeModalShown, setRemoveModalShown] = useState(false);

  const handleModalClose = () => {
    setEditModalShown(false);
  };

  const handleEditProduct = () => {
    setEditModalShown(true);
    dispatch(setCurrentProduct({ id, count, name, size, weight, imageUrl, comments }));
  };

  const handleRemoveProduct = () => {
    setRemoveModalShown(true);
  };

  const handleRemoveItemSuccess = () => {
    dispatch(deleteProduct(id));
    setRemoveModalShown(false);
  };

  const handleExpandClick = () => {
    setCommentsShown(!commentsShown);
  };

  return (
    <>
      <Card sx={{ maxWidth: 400, mb: 3 }}>
        <CardMedia
          component="img"
          height="200"
          image={imageUrl}
          alt={`Image of product ${name}`}
          sx={{ objectFit: "contain", p: 2 }}
        />
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            {name}
          </Typography>
          <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
            <Chip label={`Count: ${count}`} variant="outlined" size="small" />
            <Chip label={`Weight: ${weight}`} variant="outlined" size="small" />
          </Box>
          <Typography variant="body2" color="text.secondary">
            Size: {size.width}×{size.height}
          </Typography>
        </CardContent>
        <Divider />
        <CardActions disableSpacing>
          <ExpandMore
            expand={commentsShown}
            onClick={handleExpandClick}
            aria-expanded={commentsShown}
            aria-label="show comments"
          />
          <Typography variant="body2" color="text.secondary">
            {commentsShown ? "Hide comments" : "Show comments"}
          </Typography>
          <Box sx={{ ml: "auto", display: "flex", gap: 1 }}>
            <Button
              size="small"
              variant="outlined"
              color="primary"
              startIcon={<EditIcon />}
              onClick={handleEditProduct}
            >
              Edit
            </Button>
            <Button
              size="small"
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleRemoveProduct}
            >
              Remove
            </Button>
            <Button
              size="small"
              variant="contained"
              component={RouterLink}
              to={`/product/${id}`}
              endIcon={<OpenInNewIcon />}
            >
              View
            </Button>
          </Box>
        </CardActions>
        <Collapse in={commentsShown} timeout="auto" unmountOnExit>
          <CardContent>
            <Comments comments={comments} productId={id} />
          </CardContent>
        </Collapse>
      </Card>

      {editModalShown && (
        <Modal onClose={handleModalClose}>
          <Form isEditing={true} setShowModal={setEditModalShown} />
        </Modal>
      )}

      {removeModalShown && <Modal onConfirm={handleRemoveItemSuccess} onClose={() => setRemoveModalShown(false)}>
        <Typography variant="body1">Are you sure you want to remove this item?</Typography>
      </Modal>}
    </>
  );
}