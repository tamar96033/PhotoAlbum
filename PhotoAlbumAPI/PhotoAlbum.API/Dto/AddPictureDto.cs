﻿namespace PhotoAlbum.API.Dto
{
    public class AddPictureDto
    {
        public string Name { get; set; }
        public List<string> Tags { get; set; }
        public int UserId { get; set; }
        public string Url { get; set; }
    }
}
