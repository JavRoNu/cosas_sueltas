if ( !"rvest" %in% installed.packages() ) install.packages("rvest")
library(rvest)

url <- "https://newsday.sportsdirectinc.com/football/nfl-players.aspx?page=/data/nfl/players/"
url2 <- "_players.html"

check <- c("Player" ,"Pos"  ,  "Team"  , "Num" ,   "Height", "Weight", "DOB" )

for( i in LETTERS){
  print(i)
  finalurl <- paste0(url,i,url2)
  
  a <- session(finalurl) |>
    html_element(css = "#sdi-rail-content > div.sdi-so > table") |>
    html_table() |>
    data.frame()
  
  nms <- as.character(a[1,])
  if( table(nms == check) > 2){

    table(nms == check) > 2
    a <- a[-1,] 
    names(a) <- nms 
  }
  
  if( i == "A") alldata <- a else alldata <- rbind(alldata,a)

}

write.csv2(alldata,"playerData.csv", row.names = F)