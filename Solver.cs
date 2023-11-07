using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Linq;
using System.Text.RegularExpressions;

namespace WordFind.Functions
{
    public static class Solver
    {
        [FunctionName("Solver")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            string board = req.Query["board"];

            if (string.IsNullOrEmpty(board) || board.Length != 16 || Regex.Matches(board, "[a-zA-Z]").Count != 16)
            {
                return new OkObjectResult("No 16-letter board received.");
            }

            var puzzle = new Squaredle(board.ToLower());
            puzzle.Initialize();
            puzzle.Solve();
            var solution = string.Join(',', puzzle.Solution);
            return new OkObjectResult(solution);
        }
    }
}
