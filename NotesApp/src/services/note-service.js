// src/services/note-service.js
import { Query } from "appwrite";
import { listDocuments } from "./database-service";
import client from "./appwrite-config";
import { Databases, ID } from "appwrite";
import { APPWRITE_DATABASE_ID, APPWRITE_COLLECTION_ID } from "@env";

const databases = new Databases(client);

// Get all notes, potentially filtered by userId
export const getNotes = async (userId) => {
  try {
    const response = await appwriteDatabase.listDocuments(
      process.env.EXPO_PUBLIC_DATABASE_ID,
      process.env.EXPO_PUBLIC_COLLECTION_ID,
      [Query.equal("user_id", userId)] // Filter by user_id
    );

    return response.documents;
  } catch (error) {
    console.error("Error fetching notes:", error);
    return [];
  }
};

// Create a new note
export const addNote = async (text, userId) => {
  try {
    const response = await appwriteDatabase.createDocument(
      process.env.EXPO_PUBLIC_DATABASE_ID,
      process.env.EXPO_PUBLIC_COLLECTION_ID,
      "unique()",
      {
        text,
        user_id: userId, // Add user ID to the note
      }
    );

    return response;
  } catch (error) {
    console.error("Error adding note:", error);
    throw error;
  }
};
// Delete a note by ID
export const deleteNote = async (noteId) => {
  try {
    // Delete the document with the specified ID
    await databases.deleteDocument(
      APPWRITE_DATABASE_ID,
      APPWRITE_COLLECTION_ID,
      noteId
    );

    return true;
  } catch (error) {
    console.error("Error deleting note:", error);
    throw error;
  }
};

// Update an existing note
export const updateNote = async (noteId, data) => {
  try {
    // Add updated timestamp
    const noteData = {
      ...data,
      updatedAt: new Date().toISOString(),
    };

    // Update the document in the database
    const response = await databases.updateDocument(
      APPWRITE_DATABASE_ID,
      APPWRITE_COLLECTION_ID,
      noteId,
      noteData
    );

    return response;
  } catch (error) {
    console.error("Error updating note:", error);
    throw error;
  }
};