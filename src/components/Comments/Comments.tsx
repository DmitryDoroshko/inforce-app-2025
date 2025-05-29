import React, { useState } from "react";
import type { IComment } from "../../model/Comment.ts";
import { 
  List, 
  ListItem, 
  ListItemText, 
  Typography, 
  Divider, 
  Box, 
  TextField, 
  Button,
  Paper,
  Stack,
  Alert,
  Collapse
} from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";
import { useAppDispatch } from "../../hooks/redux.ts";
import { addComment } from "../../store/products/productsThunks.ts";

interface CommentsProps {
  comments: IComment[];
  productId: string;
}

export function Comments({ comments, productId }: CommentsProps) {
  const dispatch = useAppDispatch();
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error">("success");

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      setAlertMessage("Comment cannot be empty");
      setAlertSeverity("error");
      setAlertOpen(true);
      return;
    }

    setIsSubmitting(true);
    try {
      await dispatch(addComment({
        productId,
        description: newComment,
        date: new Date().toISOString()
      })).unwrap();

      setNewComment("");
      setAlertMessage("Comment added successfully");
      setAlertSeverity("success");
    } catch {
      setAlertMessage("Failed to add comment");
      setAlertSeverity("error");
    } finally {
      setAlertOpen(true);
      setIsSubmitting(false);
    }
  };

  const renderedComments = comments.map((comment, index) => (
    <React.Fragment key={comment.id}>
      <ListItem alignItems="flex-start">
        <ListItemText
          primary={comment.description || "No description"}
          secondary={comment.date && new Date(comment.date).toLocaleDateString()}
        />
      </ListItem>
      {index < comments.length - 1 && <Divider component="li" />}
    </React.Fragment>
  ));

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Comments</Typography>

      <Collapse in={alertOpen}>
        <Alert 
          severity={alertSeverity} 
          onClose={() => setAlertOpen(false)}
          sx={{ mb: 2 }}
        >
          {alertMessage}
        </Alert>
      </Collapse>

      <Paper elevation={0} sx={{ p: 2, mb: 3, bgcolor: "background.paper" }}>
        <Stack direction="row" spacing={2}>
          <TextField
            fullWidth
            label="Add a comment"
            variant="outlined"
            size="small"
            value={newComment}
            onChange={handleCommentChange}
            disabled={isSubmitting}
          />
          <Button
            variant="contained"
            color="primary"
            endIcon={<SendIcon />}
            onClick={handleAddComment}
            disabled={isSubmitting || !newComment.trim()}
          >
            Post
          </Button>
        </Stack>
      </Paper>

      {comments.length === 0 ? (
        <Typography color="text.secondary" variant="body2">No comments available...</Typography>
      ) : (
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {renderedComments}
        </List>
      )}
    </Box>
  );
}