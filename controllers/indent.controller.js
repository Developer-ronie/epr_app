import {
  createIndent,
  addItemsToIndent,
  getIndentsByUser,
} from "../models/indent.model.js";
import { generateIndentNumber } from "../utils/generateIndentNumber.js";
import { syncToGoogleSheet } from "../utils/googleSheets.js";

export const submitIndent = async (req, res) => {
  try {
    const { lead_time_days, transportation_time_days, items } = req.body;
    const indent_number = generateIndentNumber();
    const indent = await createIndent(
      req.user.id,
      indent_number,
      lead_time_days,
      transportation_time_days
    );
    await addItemsToIndent(indent.id, items);

    await syncToGoogleSheet({ ...indent, items, user_id: req.user.id });
    res.status(201).json({ message: "Indent saved", indent_number });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMyIndents = async (req, res) => {
  const indents = await getIndentsByUser(req.user.id);
  res.json(indents);
};
