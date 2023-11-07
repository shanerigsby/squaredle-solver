using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;

namespace WordFind.Functions
{
    internal class Squaredle
    {
        private readonly bool[,] visited;
        private readonly char[,] grid;
        private static List<Tuple<int, int>> currentPath = new List<Tuple<int, int>>();

        private readonly HashSet<string> dictionary = new();
        public HashSet<string> Solution { get; private set; } = new();

        // Offsets for horizontal and diagonal movements.
        static int[] dx = { -1, -1, -1, 0, 1, 1, 1, 0 };
        static int[] dy = { -1, 0, 1, 1, 1, 0, -1, -1 };

        public Squaredle(string gameBoard)
        {
            visited = new bool[4, 4];
            grid = new char[4, 4];
            var letters = gameBoard.ToCharArray();
            int l = 0;
            for (int i = 0; i < 4; i++)
            {
                for (int j = 0; j < 4; j++)
                {
                    grid[i, j] = letters[l];
                    l++;
                }
            }
        }

        public void Initialize()
        {
            var binDirectory = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
            var rootDirectory = Path.GetFullPath(Path.Combine(binDirectory, ".."));
            var filePath = Path.Combine(rootDirectory, "english4-16.txt");
            LoadDictionary(filePath);
        }

        private void LoadDictionary(string filePath)
        {
            foreach (var word in File.ReadLines(filePath))
            {
                dictionary.Add(word);
            }
        }

        internal void Solve()
        {
            for (int i = 0; i < 4; i++)
            {
                for (int j = 0; j < 4; j++)
                {
                    FindAllPaths(i, j);
                }
            }
        }

        private void FindAllPaths(int row, int col)
        {
            if (row < 0 || row >= 4 || col < 0 || col >= 4 || visited[row, col])
                return;

            visited[row, col] = true;
            currentPath.Add(new Tuple<int, int>(row, col));

            if (currentPath.Count >= 4) // Minimum word length is 4
            {
                // Check if the current path forms a valid English word.
                string currentWord = "";
                foreach (var square in currentPath)
                {
                    currentWord += GetLetterAt(square.Item1, square.Item2);
                }
                if (IsValidEnglishWord(currentWord))
                {
                    Solution.Add(currentWord);
                }
            }

            for (int move = 0; move < 8; move++)
            {
                int newRow = row + dx[move];
                int newCol = col + dy[move];
                FindAllPaths(newRow, newCol);
            }

            visited[row, col] = false;
            currentPath.RemoveAt(currentPath.Count - 1);
        }

        private string GetLetterAt(int x, int y)
        {
            return grid[x, y].ToString();
        }

        private bool IsValidEnglishWord(string word)
        {
            if (dictionary.Contains(word))
            {
                return true;
            }
            return false;
        }
    }
}