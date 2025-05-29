import React, { useState } from "react";
import { addProduct, editProduct } from "../../store/products/productsThunks.ts";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.ts";
import type { IComment } from "../../model/Comment.ts";
import { selectCurrentProduct, setCurrentProduct } from "../../store/products/productsSlice.ts";
import type { IProduct } from "../../model/Product.ts";
import { Alert, Box, Button, Grid, InputAdornment, Snackbar, TextField, Typography } from "@mui/material";
import {
  AddCircleOutline as AddIcon,
  Cancel as CancelIcon,
  Edit as EditIcon,
  Image as ImageIcon,
  Scale as ScaleIcon,
  Straighten as SizeIcon,
} from "@mui/icons-material";

const DEFAULT_PRODUCT_STATE: {
  id: string;
  name: string;
  imageUrl: string;
  count: number;
  size: {
    width: number;
    height: number;
  };
  weight: string;
  comments: IComment[];
} = {
  id: "1",
  name: "",
  imageUrl: "",
  count: 0,
  size: {
    width: 0,
    height: 0,
  },
  weight: "",
  comments: [],
};

export function Form({
  isEditing,
  setShowModal,
}: {
  isEditing: boolean;
  setShowModal: (val: boolean) => void;
}) {
  const dispatch = useAppDispatch();
  const [newProduct, setNewProduct] = useState(DEFAULT_PRODUCT_STATE);
  const currentProduct = useAppSelector(selectCurrentProduct);
  const [validationError, setValidationError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const {
    name,
    imageUrl,
    count,
    size: { width, height },
    weight,
  } = newProduct;

  const validateProduct = (product: IProduct): { valid: boolean; message: string } => {
    if (product.name.trim().length === 0) {
      return { valid: false, message: "Name is required" };
    }
    if (product.imageUrl.trim().length === 0) {
      return { valid: false, message: "Image URL is required" };
    }
    if (product.count === 0) {
      return { valid: false, message: "Count must be greater than zero" };
    }
    if (product.size.width === 0) {
      return { valid: false, message: "Width must be greater than zero" };
    }
    if (product.size.height === 0) {
      return { valid: false, message: "Height must be greater than zero" };
    }
    if (product.weight.trim().length === 0) {
      return { valid: false, message: "Weight is required" };
    }
    if (!product.comments) {
      return { valid: false, message: "Comments array is required" };
    }
    return { valid: true, message: "" };
  };

  const handleAddProduct = () => {
    const validation = validateProduct(newProduct);
    if (!validation.valid) {
      setValidationError(validation.message);
      setSnackbarOpen(true);
      return;
    }

    const newIdParsedAsString = String(Math.floor(Math.random() * 1000) % 1000);

    dispatch(addProduct({ ...newProduct, id: newIdParsedAsString }));
    setNewProduct(DEFAULT_PRODUCT_STATE);
    setSuccessMessage("Product successfully added!");
    setSnackbarOpen(true);
    setShowModal(false);
  };

  const handleEditProduct = () => {
    const validation = validateProduct(currentProduct!);
    if (!validation.valid) {
      setValidationError(validation.message);
      setSnackbarOpen(true);
      return;
    }

    dispatch(
      editProduct({
        productId: currentProduct!.id,
        updatedProduct: currentProduct!,
      })
    );
    setNewProduct(DEFAULT_PRODUCT_STATE);
    setSuccessMessage("Product successfully edited!");
    setSnackbarOpen(true);
    setShowModal(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleCurrentProductChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    if (currentProduct != null) {
      dispatch(setCurrentProduct({ ...currentProduct, [name]: value }));
    } else {
      throw new Error("CurrentProduct is null");
    }
  };

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      size: {
        height: prevProduct.size.height,
        width: parseInt(value),
      },
    }));
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      size: {
        width: prevProduct.size.width,
        height: parseInt(value),
      },
    }));
  };

  const handleCurrentProductWidthChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    dispatch(
      setCurrentProduct({
        ...currentProduct!,
        size: {
          height: currentProduct!.size.height,
          width: parseInt(value),
        },
      })
    );
  };

  const handleCurrentProductHeightChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    dispatch(
      setCurrentProduct({
        ...currentProduct!,
        size: {
          width: currentProduct!.size.width,
          height: parseInt(value),
        },
      })
    );
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // By default it's adding, not editing
  if (isEditing) {
    return (
      <>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Edit Product
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid sx={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Product Name"
              name="name"
              value={currentProduct?.name || ''}
              onChange={handleCurrentProductChange}
              variant="outlined"
            />
          </Grid>

          <Grid sx={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Image URL"
              name="imageUrl"
              value={currentProduct?.imageUrl || ''}
              onChange={handleCurrentProductChange}
              variant="outlined"
              slotProps={{
                input: {
                  startAdornment: <InputAdornment position="start"><ImageIcon /></InputAdornment>
                }
              }}
            />
          </Grid>

          <Grid sx={{ xs: 12, sm: 4 }}>
            <TextField
              fullWidth
              label="Count"
              name="count"
              type="number"
              value={currentProduct?.count || 0}
              onChange={handleCurrentProductChange}
              variant="outlined"
              slotProps={{
                htmlInput: { min: 0 }
              }}
            />
          </Grid>

          <Grid sx={{ xs: 12, sm: 4 }}>
            <TextField
              fullWidth
              label="Width"
              name="width"
              type="number"
              value={currentProduct?.size.width || 0}
              onChange={handleCurrentProductWidthChange}
              variant="outlined"
              slotProps={{
                input: {
                  startAdornment: <InputAdornment position="start"><SizeIcon /></InputAdornment>
                },
                htmlInput: { min: 0 }
              }}
            />
          </Grid>

          <Grid sx={{ xs: 12, sm: 4 }}>
            <TextField
              fullWidth
              label="Height"
              name="height"
              type="number"
              value={currentProduct?.size.height || 0}
              onChange={handleCurrentProductHeightChange}
              variant="outlined"
              slotProps={{
                input: {
                  startAdornment: <InputAdornment position="start"><SizeIcon /></InputAdornment>
                },
                htmlInput: { min: 0 }
              }}
            />
          </Grid>

          <Grid sx={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Weight"
              name="weight"
              value={currentProduct?.weight || ''}
              onChange={handleCurrentProductChange}
              variant="outlined"
              slotProps={{
                input: {
                  startAdornment: <InputAdornment position="start"><ScaleIcon /></InputAdornment>
                }
              }}
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button 
            variant="outlined" 
            color="inherit" 
            onClick={() => setShowModal(false)}
            startIcon={<CancelIcon />}
          >
            Cancel
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleEditProduct}
            startIcon={<EditIcon />}
          >
            Update
          </Button>
        </Box>

        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
          <Alert 
            onClose={handleSnackbarClose} 
            severity={validationError ? "error" : "success"} 
            sx={{ width: '100%' }}
          >
            {validationError || successMessage}
          </Alert>
        </Snackbar>
      </>
    );
  }

  return (
    <>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Add New Product
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid sx={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Product Name"
            name="name"
            value={name}
            onChange={handleChange}
            variant="outlined"
          />
        </Grid>

        <Grid sx={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Image URL"
            name="imageUrl"
            value={imageUrl}
            onChange={handleChange}
            variant="outlined"
            slotProps={{
              input: {
                startAdornment: <InputAdornment position="start"><ImageIcon /></InputAdornment>
              }
            }}
          />
        </Grid>

        <Grid sx={{ xs: 12, sm: 4 }}>
          <TextField
            fullWidth
            label="Count"
            name="count"
            type="number"
            value={count}
            onChange={handleChange}
            variant="outlined"
            slotProps={{
              htmlInput: { min: 0 }
            }}
          />
        </Grid>

        <Grid sx={{ xs: 12, sm: 4 }}>
          <TextField
            fullWidth
            label="Width"
            name="width"
            type="number"
            value={width}
            onChange={handleWidthChange}
            variant="outlined"
            slotProps={{
              input: {
                startAdornment: <InputAdornment position="start"><SizeIcon /></InputAdornment>
              },
              htmlInput: { min: 0 }
            }}
          />
        </Grid>

        <Grid sx={{ xs: 12, sm: 4 }}>
          <TextField
            fullWidth
            label="Height"
            name="height"
            type="number"
            value={height}
            onChange={handleHeightChange}
            variant="outlined"
            slotProps={{
              input: {
                startAdornment: <InputAdornment position="start"><SizeIcon /></InputAdornment>
              },
              htmlInput: { min: 0 }
            }}
          />
        </Grid>

        <Grid sx={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Weight"
            name="weight"
            value={weight}
            onChange={handleChange}
            variant="outlined"
            slotProps={{
              input: {
                startAdornment: <InputAdornment position="start"><ScaleIcon /></InputAdornment>
              }
            }}
          />
        </Grid>
      </Grid>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button 
          variant="outlined" 
          color="inherit" 
          onClick={() => setShowModal(false)}
          startIcon={<CancelIcon />}
        >
          Cancel
        </Button>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleAddProduct}
          startIcon={<AddIcon />}
        >
          Add Product
        </Button>
      </Box>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert 
          onClose={handleSnackbarClose} 
          severity={validationError ? "error" : "success"} 
          sx={{ width: '100%' }}
        >
          {validationError || successMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
