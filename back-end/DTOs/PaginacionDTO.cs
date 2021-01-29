﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PeliculasAPI.DTOs
{
    public class PaginacionDTO
    {
        public int Pagina { get; set; }

        private int recordsPorPagina = 10;
        private readonly int cantidadMaximaRecordspPorPagina = 50;

        public int RecordsPorPagina
        {
            get
            {
                return recordsPorPagina;
            }
            set
            {
                recordsPorPagina = (value > cantidadMaximaRecordspPorPagina) ? cantidadMaximaRecordspPorPagina : value;
            }
        }
    }
}