if ( !"dplyr" %in% installed.packages() ) install.packages("dplyr")
if ( !"tidyr" %in% installed.packages() ) install.packages("tidyr")
if ( !"rjson" %in% installed.packages() ) install.packages("rjson")
library(dplyr)
library(tidyr)
library(rjson)
alldata <- read.csv2("playerData.csv")

hoy <- Sys.time()

finaldata <-
  alldata |>
  separate(Height, c('feet', 'inches'), "'", convert = TRUE) |>
    mutate(
      Pos_r = case_when(Pos %in% c("HB","RB","FB") ~ "RB-FB",
                        Pos %in% c("OL","OT","G","C","T") ~ "OL-G-C",
                        Pos %in% c("NT","DL","DE","DT") ~ "DL-DE",
                        Pos %in% c("DB","CB","S") ~ "DB-CB-S",
                        Pos %in% c("K","P","LS") ~ "S.TEAMS",
                        Pos == "LB"~ "LB",
                        Pos == "QB" ~ "QB",
                        Pos %in% c("TE","WR") ~ "WR-TE"), 
      inches = as.numeric(gsub('\"',"",inches)),
      Num = as.numeric(na_if(Num,"-")),
      Weight = as.numeric(gsub(' lbs',"",Weight)),
      Cm = round((12*feet + inches)*2.54,2),
      Kg = round(Weight/2.2,2),
      DOB = na_if(DOB,"-"),
      Dob = as.Date(DOB,"%m/%d/%y"),
      Age = as.numeric(round((as.Date(hoy) - b)/365,1)),
      Cm_j = round(Cm + rnorm(nrow(alldata),0,1.5),2)
           )
  

finaldata <- finaldata |> filter(!is.na(Cm) & !is.na(Kg) & !is.na(DOB))

write.csv(finaldata,"playerData_clean.csv",row.names = F)

lista <- list()
for(i in names(finaldata)) lista[[i]] <- finaldata[,i]

toJSON(lista)
write(toJSON(lista), "playerData.json")