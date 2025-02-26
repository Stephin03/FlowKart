<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Laravel & MySql</title>
</head>
<body>
    <div class="">
        <?php
            if(DB::connection()->getPdo())
            {
                echo "Successfully !!!! connected to DB \n DB name".DB::connection()->getDatabaseName();
            }
        ?>
    </div>
</body>
</html>