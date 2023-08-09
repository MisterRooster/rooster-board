import Message from "../models/message.model";

import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from "express-validator";
import asyncHandler from "express-async-handler";

// Display index page.
export const index_get = asyncHandler(async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { limit = 1000, since = 0 } = req.query;
  try {
    const messages_list = await Message.find()
      .sort({added:1})
      .skip(Number(since))
      .limit(Number(limit));

    res.render('index', { title: 'Rooster Board', messages: messages_list });
  } catch (error) {
    console.error(error);
    res.status(500);
    next(error);
  }
});

// Display Message create form on GET.
export const message_new_get = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.render('new_message', { title: 'Rooster Board | New Message' });
};

// Handle Message create on POST.
export const message_new_post = [
  // Validate and sanitize the user field.
  body("user")
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage("User name must contain atleast 3 character."),
  body("text")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Message text must be specified."),

  // Process request after validation and sanitization.
  asyncHandler(async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    try {
      // Create a genre object with escaped and trimmed data.
      const message = new Message({
        user: req.body.user,
        text: req.body.text,
        added: new Date(),
      });

      if (!errors.isEmpty()) {
        // There are errors. Render form again with sanitized values/errors messages.
        res.render("new_message", {
          title: 'Rooster Board | New Message',
          message: message,
          errors: errors.array(),
        });
  
        return;
      } else { // Data from form is valid.
        await message.save();
        res.redirect('/');
      }
    } catch (error) {
      console.error(error);
      res.status(500);
      next(error);
    }
  })
];