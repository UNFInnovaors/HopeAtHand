using HopeAtHand.Models.Managers;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HopeAtHand.Controllers
{
    public class FavoritesController : Controller
    {
        private readonly IFavoriteManager favoriteManager;

        public FavoritesController(IFavoriteManager favoriteManager )
        {
            this.favoriteManager = favoriteManager;
        }

        [HttpPost]
        public IActionResult AddFavorite([FromBody] FavoriteCreateDTO favoriteDTO)
        {
            favoriteManager.CreateFavoriate(favoriteDTO);
            return Ok();
        }
    }
}
