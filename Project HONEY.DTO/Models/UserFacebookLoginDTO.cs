﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Project_HONEY.DTO.Models
{
    public class UserFacebookLoginDTO
    {
        public string accessToken { get; set; }
        public string first_name { get; set; }
        public string last_name { get; set; }
        public string email { get; set; }
    }
}
