import { dedent } from "ts-dedent";
export const go = dedent`
package main

import "fmt"

type Maze struct {
    maze    [][]int
    visited [][]bool
    rows    int
    cols    int
}

func NewMaze(maze [][]int) *Maze {
    rows := len(maze)
    cols := len(maze[0])

    visited := make([][]bool, rows)
    for i := range visited {
        visited[i] = make([]bool, cols)
    }

    return &Maze{
        maze:    maze,
        visited: visited,
        rows:    rows,
        cols:    cols,
    }
}

func (m *Maze) DFS(x, y int, path []string) []string {
    if x < 0 || x >= m.rows || y < 0 || y >= m.cols {
        return nil
    }

    if m.visited[x][y] || m.maze[x][y] == 1 {
        return nil
    }

    path = append(path, fmt.Sprintf("(%d,%d)", x, y))

    if x == m.rows-1 && y == m.cols-1 {
        return path
    }

    m.visited[x][y] = true

    if p := m.DFS(x+1, y, path); p != nil {
        return p
    }
    if p := m.DFS(x, y+1, path); p != nil {
        return p
    }
    if p := m.DFS(x-1, y, path); p != nil {
        return p
    }
    if p := m.DFS(x, y-1, path); p != nil {
        return p
    }

    return nil
}

func main() {
    maze := [][]int{
        {0, 1, 1, 1},
        {0, 0, 1, 0},
        {1, 0, 0, 0},
        {1, 1, 0, 0},
    }

    m := NewMaze(maze)
    path := m.DFS(0, 0, []string{})
    fmt.Println(path)
}
`;
