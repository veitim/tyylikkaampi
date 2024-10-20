import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, TextInput, Button, View, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { SQLiteProvider } from 'expo-sqlite';
import Groceries from './Groceries';
import { PaperProvider, Appbar } from 'react-native-paper';

export default function App() {

  const [product, setProduct] = useState('');
  const [amount, setAmount] = useState('');
  const [groceries, setGroceries] = useState([]);

  const db = SQLite.openDatabaseSync('grocerydb');

  const initialize = async (db) => {
    try {
      await db.execAsync(
        `CREATE TABLE IF NOT EXISTS grocery (id INTEGER PRIMARY KEY NOT NULL, product TEXT, amount TEXT);`);
      // Todo: update the course list
    } catch (error) {
      console.error('Could not open database', error);
    }
  }

  return (
    <PaperProvider theme={theme}>
      <Appbar mode="medium" elevated>
        <Appbar.Content style= {{color: "white"}} title="Shopping List" />
      </Appbar>
      <SQLiteProvider
        databaseName='grocerydb.db'
        onInit={initialize}
        onError={error => console.error('Could not open database', error)}
      >
        <Groceries />
      </SQLiteProvider>
    </PaperProvider>
  );
};

const theme = {
  roundness: 0,
    "colors": {
      "primary": "#1976d2",
      "onPrimary": "rgb(255, 255, 255)",
      "primaryContainer": "#1976d2",
      "onPrimaryContainer": "red",
      "secondary": "#1976d2",
      "onSecondary": "rgb(255, 255, 255)",
      "secondaryContainer": "#1976d2",
      "onSecondaryContainer": "rgb(33, 24, 42)",
      "tertiary": "#1976d2",
      "onTertiary": "rgb(255, 255, 255)",
      "tertiaryContainer": "#1976d2",
      "onTertiaryContainer": "rgb(50, 16, 23)",
      "error": "rgb(186, 26, 26)",
      "onError": "rgb(255, 255, 255)",
      "errorContainer": "rgb(255, 218, 214)",
      "onErrorContainer": "rgb(65, 0, 2)",
      "background": "rgb(255, 255, 255)",
      "onBackground": "red",
      "surface": "rgb(255, 255, 255)",
      "onSurface": "rgb(29, 27, 30)",
      "surfaceVariant": "255, 255, 255",
      "onSurfaceVariant": "rgb(74, 69, 78)",
      "outline": "rgb(124, 117, 126)",
      "outlineVariant": "rgb(204, 196, 206)",
      "shadow": "rgb(0, 0, 0)",
      "scrim": "rgb(0, 0, 0)",
      "inverseSurface": "rgb(50, 47, 51)",
      "inverseOnSurface": "rgb(245, 239, 244)",
      "inversePrimary": "rgb(220, 184, 255)",
      "elevation": {
        "level0": "transparent",
        "level1": "rgb(248, 242, 251)",
        "level2": "#1976d2",
        "level3": "rgb(240, 231, 246)",
        "level4": "rgb(239, 229, 245)",
        "level5": "rgb(236, 226, 243)"
      },
      "surfaceDisabled": "rgba(29, 27, 30, 0.12)",
      "onSurfaceDisabled": "rgba(29, 27, 30, 0.38)",
      "backdrop": "#1976d2"
    }
};