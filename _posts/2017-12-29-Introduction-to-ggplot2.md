---

layout: post
title: "Introduction to ggplot2"
date: 2017-12-29
comments: false

---

This is a notebook that was adapted from a workshop I gave to the Panama
R User Group in Panama City. Although the tutorial assumes the user has
a working knowledge of R, it is intended for all levels of R users –
from beginner to advanced – and requires no prior knowledge of ggplot2.

The purpose of this tutorial is to provide a baseline understanding of
ggplot2 by guiding the user through a series of interactive exercises
using built-in R datasets. At the conclusion of the tutorial, the user
will have all the necessary tools to apply these methods to their own
datasets and sufficient knowledge to further explore ggplot2's functions
on their own. This tutorial starts by introducing the philosophy and
logic behind ggplot2, segues into breaking down the different components
of a ggplot2 graphic, and concludes with examples to concretize the
concepts presented and resources for future exploration.

A Grammar of Graphics
---------------------

ggplot2 is built upon the idea of a 'grammar of graphics'.

In the grammar of language, different words serve different functions -
e.g. as nouns, adjectives, verbs - but they come together to present a
complete idea in the form of a sentence. Analogously, in the grammar of
graphics, different elements - e.g. a dataset, a coordinate system, a
geometric representation, an aesthetic palette – come together in the
form of a graphic.

Consider the following plot, for instance, which presents lynx and hare
trappings between 1821-1934 in Canada:

![](https://github.com/asardain/asardain.github.io/tree/master/blogfiles/2017-12-29-Introduction-to-ggplot2_files/unnamed-chunk-2-1.png)

<sup>(Data adapted from Odum, Fundamentals of Ecology, Saunders,
1953)</sup>

In this plot, some of the elements we observe are the following:

-   Data (year, count, and species)
-   A line graph representing counts of a given species for a given year
-   A linear scaling
-   A Cartesian coordinate system

Conceptualizing graphics as the superposition of various elements or
'layers' is extremely helpful for two reasons. First, it allows us to
create complex graphics relatively easily by adding elements according
to a predefined 'grammatical structure'. Second, it allows us to create
a range of different graphics without having to make major changes to
our code, simply by adding a layer or substituting one for another.
Consider, for instance, the above plot that was generated with the
following code:

    ggplot(data = lynxhare, aes (x = Year,y = Count, group = Species, colour = Species)) + geom_line() + theme_minimal()

If, for whatever reason, we decided that we would rather have the data
represented as points, we simply have to replace one element -
`geom_line()` - with another - `geom_points()`:

    ggplot(data = lynxhare, aes (x = Year, y = Count, group = Species, colour = Species)) + geom_point() + theme_minimal()

![](https://github.com/asardain/asardain.github.io/tree/master/blogfiles/2017-12-29-Introduction-to-ggplot2_files/unnamed-chunk-5-1.png)

Similarly, we can present the data as columns, by making a similar
substitution:

    ggplot(data = lynxhare, aes (x = Year, y = Count, group = Species, colour = Species, fill = Species)) + geom_col() + theme_minimal()

![](https://github.com/asardain/asardain.github.io/tree/master/blogfiles/2017-12-29-Introduction-to-ggplot2_files/unnamed-chunk-7-1.png)

We may even combine elements:

    ggplot(data = lynxhare, aes (x = Year, y = Count, group = Species, colour = Species)) + geom_point() + geom_line() + theme_minimal()

![](https://github.com/asardain/asardain.github.io/tree/master/blogfiles/2017-12-29-Introduction-to-ggplot2_files/unnamed-chunk-9-1.png)

The grammar of graphics philosophy simplifies the creation of plots by
breaking down the graphic into its constititutive elements. Having to
articulate your graphic as a superposition of individual layers will
also help you structure your thoughts about what it is you want out of
your graphic. The grammar of graphics is one major advantage of using
ggplot2, however there are [many
others](link:%20https://github.com/tidyverse/ggplot2/wiki/Why-use-ggplot2).

------------------------------------------------------------------------

Components of ggplot2
---------------------

We saw earlier some examples of graphics created using ggplot2.
Hopefully, by reading the code associated to each graphic, you have
started to key into some of ggplot2's grammatical rules. Here we will
lay them out explicitly.

The template for making a plot in ggplot2 is as follows:

    ggplot(data = <DATA>, mapping = aes(<MAPPING>)) + 
    <GEOM FUNCTION>() +
    <COORDINATE FUNCTION>() +
    <FACET FUNCTION>() + 
    <SCALE FUNCTION>() +
    <THEME FUNCTION>()

This may seem overwhelming, but keep in mind only the first two lines
are absolutely necessary to create a plot in ggplot2; the subsequent
functions simply allow you to add or tweak elements of your graphic.

### The Core Elements

Let's examine the core elements in a little more detail.

First, the creation of a graphic always begins by calling the `ggplot()`
function. This function simply initiatilizes the creation process; we
will have to add layers to `ggplot()` to actually yield a tangible
graphic. Although `ggplot()` must always be called first, subsequent
functions can be called in any order we wish (although it is recommended
you stick to the format outlined above to facilitate comprehension).

The first argument we pass to `ggplot()` is the data we would like to
use for our graphic. Data we feed to `ggplot()` needs to be in the form
of a data frame. The data frame can be structured in long format or wide
format, and although there are reasons to use both, ggplot2 tends to
work best with long format data. In our examples, we will restrict
ourselves to using data frames structured in wide format as they tend to
be more intuitive to read.

Next, we have the option of specifying the aesthetics of our graphics
using `aes()`. In `aes()`, we will map our data to visual properties of
our graphic we wish to see. Every variable we are interested in
representing in our graphic should be specified as an argument in the
`aes()` function. In simple plots, this may mean simply specifying which
data should be represented on the x-axis and which data should be
represented on the y-axis - for instance, height (x) and weight (y).
However, for certain types of plots or plots with more than 2 variables,
we may want to express a variable in a different way. For instance, in
our height vs. weight example, we may choose to include a color
component - showing the points representing female individuals as green,
and those representing male individuals as orange.

The final core element is the geom function - commonly referred to as a
'geom'. As its name suggests, geoms are the geometrical representation
of our data. Examples of geoms include `geom_point()` (scatterplot),
`geom_bar()` (bar chart), `geom_line()` (line plot), and
`geom_histogram()` (histogram). The same data can be plotted using
different geoms, but - as we saw with the lynx and hare example - some
geoms are better suited for certain types of data/certain relationships
than others. With almost 40 geoms at your disposal it is up you to
determine which best suits your data. However, with ggplot2's grammar of
graphics functionality, the task of testing out different graphical
representations of our data is made easy, as it is sufficient to replace
one geom for another to obtain vastly different plots.

I mentioned earlier how `aes()` can optionally be specified in the
`ggplot()` function. The other option is to specify `aes()` in our geom.
Why choose one over the other? Specifying `aes()` within the geom
function will result in that aesthetic only being used by that specific
geom. However, if `aes()` is set in the `ggplot()` function, it is
inherited by all the geoms that build on top of it, with the neat
feature that any `aes()` subsequently specified in a geom will override
the `aes()` set in `ggplot()` for that particular geom.

### Optional Components

Finally, we will briefly mention the optional four functions.

-   The coordinate function family allows you to manipulate the
    coordinate system onto which your geoms are plotted. Plotting a bar
    chart (`geom_bar()`) on a polar coordinate system (`polar_coord()`),
    for instance, will turn your regular bar graph into a pie chart or
    polar area graph by forcing the graphic to plot radially instead of
    latititudinally or langitudinally.

-   The facet function family allows you to create a panel graphic
    composed of multiple sub-plots, dividing your data according to a
    categorical variable in your data. For instance, if you were
    interested in creating a graphic showing your budget allocation by
    category for every month of the year, you could use facets to create
    a panel of 12 individual pie charts.

-   The scale function is what maps values in the data space to values
    in aesthetic space. For now, it is sufficient to know that this
    family of functions allow you to do things such as manipulate the
    range of your plot's axes, apply log transformation to your plotted
    data, and even flip your plots upside down. [This
    webpage](https://rstudio-pubs-static.s3.amazonaws.com/3364_d1a578f521174152b46b19d0c83cbe7e.html)
    presents quite a few visual examples of things you can do with scale
    functions.

-   The theme function family, meanwhile, allows you manipulate the
    appearance of non-data components in your plot. Visual properties of
    your axes, legends, as well as background colors and gridlines all
    fall under the domain of theme functions.

------------------------------------------------------------------------

Example 1:
----------

Let's begin with a simple example. R's built-in 'iris' dataset lists
various measurements for 100 flowers belonging to one of three iris
species: Iris setosa, Iris versicolor, and Iris virginica.

Let's say we are interested in plotting the relationship between a
flower's sepal length and its sepal width. For now, we will assume we're
not interested in distinguishing between the three species. 

Let's start by taking a look at our dataset:

    data(iris) # Load in the dataset iris from R's built-in datasets
    head(iris)


    ##   Sepal.Length Sepal.Width Petal.Length Petal.Width Species
    ## 1          5.1         3.5          1.4         0.2  setosa
    ## 2          4.9         3.0          1.4         0.2  setosa
    ## 3          4.7         3.2          1.3         0.2  setosa
    ## 4          4.6         3.1          1.5         0.2  setosa
    ## 5          5.0         3.6          1.4         0.2  setosa
    ## 6          5.4         3.9          1.7         0.4  setosa

Let's see how we might plot this:

    library(ggplot2) # Load in the ggplot library
    
    ggplot(data = iris,                              # (1)
        aes(x = Sepal.Length, y = Sepal.Width)) +    # (2)
        geom_point() +                               # (3)
        xlab("Sepal Length (mm)") +                  # (4)
        ylab("Sepal Width (mm)") +           
        ggtitle("Sepal dimensions")                  # (5)

![](https://github.com/asardain/asardain.github.io/tree/master/blogfiles/2017-12-29-Introduction-to-ggplot2_files/unnamed-chunk-10-1.png)

1.  We start by providing ggplot2 with a data frame object which
    contains the data of interest.
2.  Next we need to tell ggplot2 how the data we are interested in
    plotting will map onto our graphic. In this case, we want sepal
    length to be represented on the x-axis, and sepal width on the
    y-axis. Arguments you pass in `aes()` must match the names of
    columns in your data frame.
3.  We are interested in creating a scatter plot. This corresponds to
    the `geom_point()` geom.
4.  We could have left things there, but for aesthetic purposes let's
    rename our axes. We achieve this using the `xlab()` and `ylab()`
    layers that belong to the family of theme functions.
5.  Finally, let's alter the title of the plot. By default, `ggtitle()`
    sets its title aligned left, however you could also have it aligned
    center by tacking on the following layer:
    `theme(plot.title = element_text(hjust = 0.5))`.

Let us say now that we are interested in distinguishing between the
different Iris species in our plot, and we would like this difference to
be shown both by color and shape of the data points. To do this, we must
add color and shape elements to our `aes()`, as we are adding these
elements as visual properties of our graphic. And because both color and
shape depend on the species of the flower, we will input the name of the
corresponding column from our data frame (here, 'species') into our
`aes()` function. Our code would then read as follows:

    ggplot(data = iris,                             
        aes(x = Sepal.Length, y = Sepal.Width, color = Species, shape = Species )) +                
        geom_point() +                       
        xlab("Sepal Length (mm)") +          
        ylab("Sepal Width (mm)") +           
        ggtitle("Sepal dimensions")

![](https://github.com/asardain/asardain.github.io/tree/master/blogfiles/2017-12-29-Introduction-to-ggplot2_files/unnamed-chunk-11-1.png)

Let us say we wanted to make some aesthetic changes to our plot. For
instance, let us say we wanted to change the color of the points, to set
the x- and y-axes starting at zero, and to remove the grey background of
our plot. Here's how we might go about doing this:

    ggplot(data = iris,                             
        aes(x = Sepal.Length, y = Sepal.Width, color = Species, shape = Species )) +                
        geom_point() +                       
        xlab("Sepal Length (mm)") +          
        ylab("Sepal Width (mm)") +           
        ggtitle("Sepal dimensions") + 
        scale_color_manual(values = c("lightskyblue3", "dodgerblue4", "orange2")) + #(1)
        xlim(0,10) +                                                              #(2)
        ylim(0,5) +           
        theme_bw()                                                                #(3)  

![](https://github.com/asardain/asardain.github.io/tree/master/blogfiles/2017-12-29-Introduction-to-ggplot2_files/unnamed-chunk-12-1.png)

1.  To our previous code, we now add a layer that changes the colors of
    our data points. For a complete list of colors supported by ggplot,
    refer [here](http://sape.inf.usi.ch/quick-reference/ggplot2/colour).
2.  Next we add an layer stating the desired range of our plots.
3.  Finally, we impose a pre-coded theme to our graphic. There are many
    built-in themes in ggplot2 one can choose from, and you can even
    download others to have your plots [resemble those from The
    Economist or Five Thirty
    Eight](https://cran.r-project.org/web/packages/ggthemes/vignettes/ggthemes.html).
    To simplify our task here, we applied a theme that happened to match
    the desired aesthetic we were going for, however more fine-tune
    aesthetic changes to a graphic [can also be
    made](http://ggplot2.tidyverse.org/reference/theme.html).

Finally, let's say we were interested in incorporating a linear
regression in our graphic. Keeping with how we've presented our data, we
would like the regression to take the sepal width as its dependent
variable, and sepal length and species as its predictor variables. For
those familiar with R's `lm()` function, this would be analogous to
plotting the fit from `lm(sep.wid ~ sep.len + species, data=iris)`. This
is very simple in ggplot2:

    ggplot(data = iris,                             
        aes(x = Sepal.Length, y = Sepal.Width, color = Species, shape = Species )) +                
        geom_point() +                       
        xlab("Sepal Length (mm)") +          
        ylab("Sepal Width (mm)") +           
        ggtitle("Sepal dimensions") + 
        scale_color_manual(values = c("lightskyblue3", "dodgerblue4", "orange2")) + 
        xlim(0,10) +                                                   
        ylim(0,5) + 
        theme_bw() + 
        geom_smooth(method = 'lm', se = FALSE)

![](https://github.com/asardain/asardain.github.io/tree/master/blogfiles/2017-12-29-Introduction-to-ggplot2_files/unnamed-chunk-13-1.png)

Here, all we had to add a `geom_smooth()` layer (recall from before that
we can add multiple geoms on the same plot) and specify the regression
method. Here we chose lm, however ggplot is also integrated with other
built-in R fitting methods, including `glm()` and `gam()`, which makes
application of these methods just as easy. By default `geom_smooth()`
displays the standard error, however this can be turned off as I have
done here.

You will notice also that we did not have to specify the predictor or
dependent variables in our `geom_smooth()` object. This is because, as
mentioned earlier, all `aes()` set within the `ggplot()` function are
passed on to any geoms that build upon it. As a result, `geom_smooth()`
assumes you are interested in treating whatever you set to 'y' as your
dependent variable, and all other variables as your predictor ones. If
you wanted a different set of predictor variables, you could either set
your `aes()` in both of your geoms rather than in in your `ggplot()`
function, or you could keep your `aes()` in your `ggplot()` function as
is, and override them in `geom_smooth()` using the `inherit.aes`
argument, like so:
`geom_smooth(method = 'lm', se = FALSE, inherit.aes=F, aes(x = sepal.len, y = sepal.wid))`.

At this point I will highlight an important consequence of the additive
property of ggplot2's layering system. In ggplot2 we can add a graphic
or part of one to an R object, and then add more complex layers as
follows: `plot.object <- plot.object + <LAYER FUNCTION>() + ...` This
also proves to be quite a time saver when generating a graphic as we can
quickly and easily try on different layers to an existing plot.

For instance, from the previous example:

    our.plot <- ggplot(data = iris,                             
        aes(x = Sepal.Length, y = Sepal.Width, color = Species, shape = Species )) +                
        geom_point() +                       
        xlab("Sepal Length (mm)") +          
        ylab("Sepal Width (mm)") +           
        ggtitle("Sepal dimensions") + 
        scale_color_manual(values = c("lightskyblue3", "dodgerblue4", "orange2")) + 
        xlim(0,10) +                                                   
        ylim(0,5)   +
        geom_smooth(method = 'lm', se = FALSE)
     our.plot

![](https://github.com/asardain/asardain.github.io/tree/master/blogfiles/2017-12-29-Introduction-to-ggplot2_files/unnamed-chunk-14-1.png)

     our.plot + theme_bw()

![](https://github.com/asardain/asardain.github.io/tree/master/blogfiles/2017-12-29-Introduction-to-ggplot2_files/unnamed-chunk-15-1.png)

     our.plot + theme_dark()

![](https://github.com/asardain/asardain.github.io/tree/master/blogfiles/2017-12-29-Introduction-to-ggplot2_files/unnamed-chunk-16-1.png)

Example 2:
----------

Let's now try apply some of these principles to a different dataset.

The following example uses the BlueJays dataset, which can be found in
the Stat2Data package. Remember to load the package (as well as the
dataset itself) before attempting to replicate the code below.

    library(Stat2Data)
    data(BlueJays)

This dataset lists various physiological attributes of a sample of 123
bluejays. For this example, we will create a histogram showing cranial
lengths (column `Head`) in the sample, separating the bluejays by sex
(column `KnownSex`).

Let's start by creating the basic plot:

    ggplot(data = BlueJays, 
        aes(x = Head, color = KnownSex)) +          #(1)
        geom_histogram()                            #(2)

![](https://github.com/asardain/asardain.github.io/tree/master/blogfiles/2017-12-29-Introduction-to-ggplot2_files/unnamed-chunk-18-1.png)

1.  As before, we feed `ggplot()` our dataset, and specify the variables
    we are interested in conveying in our graphic. Histograms show
    frequency counts of a given variable of interest, with the variable
    of interest listed on the x-axis and counts shown on the y-axis. In
    this case, we're interested in creating a histogram of cranial
    lengths, so this variable is what we will specify in our 'x'
    argument in `aes()`; there is no need to specify anything for the
    y-axis as this will be handled by the histogram geom. Cranial length
    isn't the only variable we are interested in, however: we also want
    to incorporate 'sex' as a variable in our histogram. It follows that
    sex should be incorporated in our `aes()`. In our histogram, we will
    use color to demarcate the two groups.

2.  Once our dataset and `aes()` have been specified, we add on a
    histogram geom to create a graphic.

As you can see, our graphic leaves quite a bit to be desired. Ignoring
the aesthetic elements for a moment, you might notice that the
histograms for female and male counts are stacked on top of one another.
This presentation can be useful at times, however it can also make it
difficult to get a proper sense of the number of counts of the set that
is stacked on top. Instead, we would like to overlay the histograms,
while making them translucent so that the two histograms can be read at
the same time.

In addition, although we've successfully demarcated the two groups by
outlining the corresponding bars, really we would like the bars
themselves to be colored as well.

Finally, we'd like to alter the size of the bins our data is grouped
into to make our plot easier to read. Both changes are easy to make:

    ggplot(data = BlueJays, 
        aes(x = Head, color = KnownSex, fill = KnownSex)) +                 #(1)
        geom_histogram(position = "identity", alpha = 0.5, binwidth = 0.5)  #(2)

![](https://github.com/asardain/asardain.github.io/tree/master/blogfiles/2017-12-29-Introduction-to-ggplot2_files/unnamed-chunk-19-1.png)

1.  Here, we've specified another argument in our `aes()` - that any
    /filling in/ of colors should be done on the basis of sex. Although
    the distinction between 'coloring' and 'filling' is not unique to
    ggplot2, it may seem unnecessary; however, it also provides us with
    another degree of control over our graphic should we need it.

2.  We've also added a couple arguments to our geom. 'Position' tells
    `geom_histogram()` how to present overlapping points - by default,
    position is set to 'stack', which produces the result seen above. To
    conserve overlap and present as is, we set position to 'identity'
    (we can also set position to 'dodge' which will result in the bars
    being interleaved). We also change the degree of transparency of the
    bars by lowering our alpha below the default value of 1 so that the
    bars can be seen through one another. We also specify the size of
    the bins we'd like to divide the data into. By default,
    `geom_histogram()` doesn't split the data into bins of a certain
    size, but into a certain number of bins (30). We can alter how many
    bins to divide our range into in our geom\_histogram function, using
    the 'bin' argument instead of 'binwidth'.

Now, let's make some aesthetic changes. Specifically, we'd like to add a
title and labels, change the color scheme, and apply a more
stripped-down theme.

    ggplot(data = BlueJays, 
        aes(x = Head, color = KnownSex, fill = KnownSex)) +     
        geom_histogram(position = "identity", alpha=0.5, binwidth=0.5) +                                        
        xlab("Head Length (mm)") +           
      ylab("Count") +            
      ggtitle("Bluejay skull dimensions") + 
      theme_minimal() + 
      scale_color_manual(values=c("lightskyblue3", "dodgerblue4")) +
        scale_fill_manual(values=c("lightskyblue3", "dodgerblue4"))

![](https://github.com/asardain/asardain.github.io/tree/master/blogfiles/2017-12-29-Introduction-to-ggplot2_files/unnamed-chunk-20-1.png)

Having completed Example 1, the layers added here should require no
additional explanation. It is worth noting, however, that there are two
modifications that need to be made here: one acts on the color aesthetic
and the other acts on the fill aesthetic.

Just for fun, let's say we wanted to overlay a density plot on our
histogram, and add some lines showing the mean cranial length of male
and female birds.

Let's start by calculating the mean values:

    library(dplyr)
    mu <- BlueJays %>% group_by(KnownSex) %>% summarise(Grp.Mean = mean(Head))
    mu

    ## # A tibble: 2 x 2
    ##   KnownSex Grp.Mean
    ##     <fctr>    <dbl>
    ## 1        F 54.64533
    ## 2        M 56.69190

The above operation, which requires the dplyr package to run, is
analogous to the following operation:
`tapply(BlueJays$Head,BlueJays$KnownSex,mean)`, but the output format is
more friendly for use with ggplot. (The dplyr package is a powerful tool
for data manipulation built by the author of ggplot2, meaning these two
packages are very compatible with one another. This is all we will
mention about the dplyr package for now, but I encourage you all to
explore its functions.)

Once we have our means calculated, we can run the following code:

    ggplot(data=BlueJays, 
        aes(x=Head,color=KnownSex,fill=KnownSex,group=KnownSex)) +
        geom_histogram(aes(y=..density..),position="identity",alpha=0.5,binwidth=0.5) +     #(1)
        theme_minimal() +
        scale_color_manual(values=c("lightskyblue3", "dodgerblue4")) +
        scale_fill_manual(values=c("lightskyblue3", "dodgerblue4")) +
        xlab("Head Length (mm)") +           
        ylab("Density") +            
        ggtitle("Bluejay skull dimensions") + 
        geom_density(alpha=0.2) +                                                           #(2)
        geom_vline(data=mu, aes(xintercept=Grp.Mean,color=KnownSex),    
                linetype="dashed", size=0.75)                                               #(3)

![](https://github.com/asardain/asardain.github.io/tree/master/blogfiles/2017-12-29-Introduction-to-ggplot2_files/unnamed-chunk-22-1.png)

1.  Before we overlay our density plot, we must convert the counts on
    our histogram to densities. We do this by passing `..density..` to
    the 'y' aesthetic. The double dots are a signal to ggplot2 for it to
    do its own internal computation of the value rather than for it to
    refer directly to the dataset.
2.  Next we simply add on a `geom_density()` geom, passing an alpha &lt;
    1 to increase the translucence of the fill of the density plot.
3.  Finally, to add our mean lines, we had a vertical line geom -
    `geom_vline()`. Unlike our other geoms, this geom takes as input the
    object `mu` we just created. Since we are feeding it a different
    dataset, we also have to define the `aes()` for the geom - here, the
    placement of the vertical lines on the x-axis is determined by the
    mean values themselves (`Grp.Mean` column from `mu`), and the color
    by the sex of the bird (`KnownSex` column from `mu`). We also make
    some aesthetic changes to the lines - making them dashed rather than
    solid, and reducing their width to our taste.

As a final demonstration of ggplot2's flexibility, we will split the two
groups into separate graphs with the addition of a single line:

    ggplot(data=BlueJays, 
        aes(x=Head,color=KnownSex,fill=KnownSex,group=KnownSex)) +
        geom_histogram(aes(y=..density..),position="identity",alpha=0.5,binwidth=0.5) +     
        theme_minimal() +
        scale_color_manual(values=c("lightskyblue3", "dodgerblue4")) +
        scale_fill_manual(values=c("lightskyblue3", "dodgerblue4")) +
        xlab("Head Length (mm)") +           
        ylab("Density") +            
        ggtitle("Bluejay skull dimensions") + 
        geom_density(alpha=0.2) +                                                           
        geom_vline(data=mu, aes(xintercept=Grp.Mean,color=KnownSex),    
                linetype="dashed", size=0.75) +
        facet_wrap(~KnownSex)                                               

![](https://github.com/asardain/asardain.github.io/tree/master/blogfiles/2017-12-29-Introduction-to-ggplot2_files/unnamed-chunk-23-1.png)

`facet_wrap`, a member of the family of facet function, divides the
plots according to a variable and wraps them into a rectangular layout.

------------------------------------------------------------------------

Resources
---------

This concludes our introduction to ggplot2. Here, we restricted
ourselves to covering the basics of the package, however you should now
be adequately prepared toexplore ggplot2's more advanced features on
your own. To help get you started, I strongly recommend consulting some
of the following resources:

ggplot2

-   [The R Graph Catalog](http://shinyapps.stat.ubc.ca/r-graph-catalog/)
-   [The RStudio ggplot2 Cheat
    Sheet](https://www.rstudio.com/wp-content/uploads/2015/03/ggplot2-cheatsheet.pdf)

Lecture notes from Hadley's Stat 405 course:

-   [Advanced data
    manipulation](http://stat405.had.co.nz/lectures/11-adv-data-manip.pdf)
-   [Tables](http://stat405.had.co.nz/lectures/19-tables.pdf)

Data manipulation for use with ggplot2 (dplyr and tidyr):

-   [The RStudio Data Wrangling Cheat
    Sheet](https://www.rstudio.com/wp-content/uploads/2015/02/data-wrangling-cheatsheet.pdf)
-   [CRAN Intro to
    dplyr](https://cran.rstudio.com/web/packages/dplyr/vignettes/introduction.html)
-   [Sean Anderson's Intro to dplyr and
    pipes](http://seananderson.ca/2014/09/13/dplyr-intro.html)
-   [Bradley Boehmke's Intro to data
    wrangling](https://rpubs.com/bradleyboehmke/data_wrangling)

------------------------------------------------------------------------
