import { dedent } from "ts-dedent";
export const sql = dedent`
-- Create the movies table
CREATE TABLE movies (
  id INTEGER PRIMARY KEY,
  title TEXT,
  release_year INTEGER,
  director TEXT,
  genre TEXT
);

-- Insert some data
INSERT INTO movies (id, title, release_year, director, genre)
VALUES (1, 'The Shawshank Redemption', 1994, 'Frank Darabont', 'Drama'),
       (2, 'The Godfather', 1972, 'Francis Ford Coppola', 'Drama'),
       (3, 'The Dark Knight', 2008, 'Christopher Nolan', 'Action'),
       (4, '12 Angry Men', 1957, 'Sidney Lumet', 'Drama'),
       (5, 'Schindler''s List', 1993, 'Steven Spielberg', 'Drama');

-- Search for movies
SELECT title, release_year, director, genre
FROM movies
WHERE release_year >= 1990
  AND genre = 'Drama'
ORDER BY release_year DESC;
`;
